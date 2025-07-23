import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server"
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/backend";
import { api } from "./_generated/api"

const http = httpRouter();

http.route({
    path: "/clerk-webhook",
    method: "POST",

    handler: httpAction(async (ctx, request) => {
        const event = await validateRequest(request);
        if (!event) {
            return new Response("Error occured", { status: 400 });
        }
        console.log("event type::", event.type);
        console.log("event data::", event.data);

        const eventType = event.type;

        if (eventType === "user.created") {
            // save the user details to the convex database;
            const { id, email_addresses, first_name, last_name } = event.data;

            const email = email_addresses[0].email_address;
            const name = `${first_name || ""} ${last_name || ""}`.trim();

            try {
                await ctx.runMutation(api.users.syncUser, {
                    userId: id,
                    email,
                    name
                })
            } catch (error) {
                console.log("error creating user::", error);
                return new Response("error creating user", { status: 500 })
            }
        }
        return new Response("Webhook processed successfully", { status: 200 });
    })
})

async function validateRequest(req: Request): Promise<WebhookEvent | null> {
    const payloadString = await req.text();
    const svixHeaders = {
        "svix-id": req.headers.get("svix-id")!,
        "svix-timestamp": req.headers.get("svix-timestamp")!,
        "svix-signature": req.headers.get("svix-signature")!,
    };
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
        throw new Error("Missing clerk webhook secret env variable");
    }
    const wh = new Webhook(webhookSecret);
    try {
        return wh.verify(payloadString, svixHeaders) as unknown as WebhookEvent;
    } catch (error) {
        console.error("Error verifying webhook event", error);
        return null;
    }
}

export default http;