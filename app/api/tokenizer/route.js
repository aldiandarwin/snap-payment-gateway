import Midtrans from 'midtrans-client';
import { NextResponse } from 'next/server';

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

export async function POST(request) {
    try {
        const { id, productName, price, quantity } = await request.json();

        let parameter = {
            item_details: {
                name: productName,
                price: price,
                quantity: quantity,
            },
            transaction_details: {
                order_id: id,
                gross_amount: price * quantity,
            },
        };

        const token = await snap.createTransactionToken(parameter);
        console.log('Transaction Token:', token);

        return NextResponse.json({ token });
    } catch (error) {
        console.error('Error processing the request:', error.message);
        return NextResponse.error({
            status: 500,
            message: 'Internal Server Error',
        });
    }
}
