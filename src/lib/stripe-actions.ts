'use server'

import { getServerAuthSession } from "@/server/auth";
import { stripe } from "./stripe";
import { redirect } from "next/navigation";
import { db } from "@/server/db";

export async function createCheckoutSession() {
    const session1 = await getServerAuthSession();

    if (!session1) {
        throw new Error('Session not found');
    }

    const userId = session1?.user?.id;

    if (!userId) {
        throw new Error('User not found');
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price: process.env.STRIPE_PRICE_ID,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_URL}/mail`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
        client_reference_id: userId.toString(),
    });

    redirect(session.url!);
}

export async function createBillingPortalSession() {
    const session1 = await getServerAuthSession();

    if (!session1) {
        throw new Error('Session not found');
    }
    
    const userId = session1?.user?.id;

    if (!userId) {
        throw new Error('User not found');
    }

    const subscription = await db.stripeSubscription.findUnique({
        where: { userId: userId },
    });
    if (!subscription?.customerId) {
        throw new Error('Subscription not found');
    }
    const session = await stripe.billingPortal.sessions.create({
        customer: subscription.customerId,
        return_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    });
    redirect(session.url!)
}

export async function getSubscriptionStatus() {
    const session1 = await getServerAuthSession();

    if (!session1) {
        throw new Error('Session not found');
    }
    
    const userId = session1?.user?.id;

    if (!userId) {
        throw new Error('User not found');
    }

    const subscription = await db.stripeSubscription.findUnique({
        where: { userId: userId },
    });
    if (!subscription) {
        return false;
    }
    return subscription.currentPeriodEnd > new Date();
}