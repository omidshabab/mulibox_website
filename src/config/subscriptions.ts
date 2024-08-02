export interface SubscriptionPlan {
  id: string;
  name: string;
  stripePriceId: string;
  price: number;
}

export const storeSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "yearly",
    name: "Yearly",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID ?? "",
    price: 10,
  },
  {
    id: "monthly",
    name: "Monthly",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID ?? "",
    price: 12,
  },
];
