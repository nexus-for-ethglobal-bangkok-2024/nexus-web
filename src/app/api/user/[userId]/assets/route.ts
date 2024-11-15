import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET( request: NextRequest,
    { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId;

    // Fetch user's wallet with all holdings
    const userWallet = await prisma.crossAssetWallet.findUnique({
      where: {
        userId: userId,
      },
      include: {
        stockHoldings: {
          include: {
            stockReference: true,
          },
        },
        forexHoldings: {
          include: {
            forexReference: true,
          },
        },
        cryptoHoldings: {
          include: {
            cryptoReference: true,
          },
        },
      },
    });

    if (!userWallet) {
      return NextResponse.json(
        { error: 'Wallet not found for this user' },
        { status: 404 }
      );
    }

    // Transform the data into a more readable format
    const assets = {
      stocks: userWallet.stockHoldings.map(holding => ({
        id: holding.id,
        symbol: holding.stockReference.symbol,
        name: holding.stockReference.name,
        exchange: holding.stockReference.exchangeName,
        quantity: holding.quantity.toString(),
      })),
      forex: userWallet.forexHoldings.map(holding => ({
        id: holding.id,
        symbol: holding.forexReference.symbol,
        name: holding.forexReference.name,
        quantity: holding.quantity.toString(),
      })),
      crypto: userWallet.cryptoHoldings.map(holding => ({
        id: holding.id,
        symbol: holding.cryptoReference.symbol,
        name: holding.cryptoReference.name,
        blockchain: holding.cryptoReference.blockchainName,
        quantity: holding.quantity.toString(),
      })),
    };

    return NextResponse.json(assets);
  } catch (error) {
    console.error('Error fetching user assets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user assets' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

