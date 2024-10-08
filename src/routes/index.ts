import { Elysia, t } from "elysia";

import {
    getPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
} from "../controllers/PostController";

const Routes = new Elysia({ prefix: "/posts" })
    .get("/", async () => getPosts)
    .post("/store", async ({ body }) => createPost(body as { title: string; content: string }), {
        body: t.Object({
            title: t.String({
                minLength: 3,
                maxLength: 100,
            }),
            content: t.String({
                minLength: 3,
                maxLength: 255,
            }),
        }),
    })
    .get("/show/:id", async ({ params: { id } }) => getPostById(id))
    .patch(
        "/update/:id",
        async ({ params: { id }, body }) =>
            updatePost(id, body as { title?: string; content?: string }),
        {
            body: t.Object({
                title: t.String({
                    minLength: 3,
                    maxLength: 100,
                }),
                content: t.String({
                    minLength: 3,
                    maxLength: 255,
                }),
            }),
        }
    )
    .delete("/destroy/:id", async ({ params: { id } }) => deletePost(id));

export default Routes;
