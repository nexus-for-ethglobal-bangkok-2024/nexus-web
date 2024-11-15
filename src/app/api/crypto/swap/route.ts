// app/api/crypto/swap/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { userId } from '@/lib/constants'

export async function POST(req: Request) {
  try {
    // const session = await getServerSession(authOptions)
    // if (!session?.user?.id) {
    //   return new NextResponse('Unauthorized', { status: 401 })
    // }

    const { fromChain, toChain, fromCrypto, toCrypto, fromAmount, toAmount } = await req.json()

    // 1. Get user's wallet
    const userWallet = await db.crossAssetWallet.findUnique({
      where: { userId: userId },
    })

    if (!userWallet) {
      return new NextResponse('Wallet not found', { status: 404 })
    }

    // 2. Get or create crypto references
    const fromCryptoRef = await db.cryptoReference.upsert({
      where: { symbol: fromCrypto },
      update: {},
      create: {
        name: fromCrypto,
        symbol: fromCrypto,
        blockchainName: fromChain,
      },
    })

    const toCryptoRef = await db.cryptoReference.upsert({
      where: { symbol: toCrypto },
      update: {},
      create: {
        name: toCrypto,
        symbol: toCrypto,
        blockchainName: toChain,
      },
    })

    // 3. Create the swap transaction
    const swapTx = await db.cryptoSwappingTransaction.create({
      data: {
        acquirerId: userId,
        quantity: parseFloat(toAmount),
        totalAmount: parseFloat(fromAmount),
        cryptoReferenceId: toCryptoRef.id,
      },
    })

    // 4. Update user's crypto holdings
    // Reduce 'from' crypto
    await db.cryptoInUserCrossAssetWallet.upsert({
      where: {
        walletId_cryptoReferenceId: {
          walletId: userWallet.id,
          cryptoReferenceId: fromCryptoRef.id,
        },
      },
      update: {
        quantity: {
          decrement: parseFloat(fromAmount),
        },
      },
      create: {
        walletId: userWallet.id,
        cryptoReferenceId: fromCryptoRef.id,
        quantity: -parseFloat(fromAmount),
      },
    })

    // Increase 'to' crypto
    await db.cryptoInUserCrossAssetWallet.upsert({
      where: {
        walletId_cryptoReferenceId: {
          walletId: userWallet.id,
          cryptoReferenceId: toCryptoRef.id,
        },
      },
      update: {
        quantity: {
          increment: parseFloat(toAmount),
        },
      },
      create: {
        walletId: userWallet.id,
        cryptoReferenceId: toCryptoRef.id,
        quantity: parseFloat(toAmount),
      },
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Swap completed successfully',
      transactionId: swapTx.id 
    })

  } catch (error) {
    console.error('Swap error:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}