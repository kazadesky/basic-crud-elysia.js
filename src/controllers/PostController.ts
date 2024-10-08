import prisma from "../../prisma/client";

export async function getPosts() {
    try {
        const posts = await prisma.post.findMany({ orderBy: { id: "desc" } });

        return new Response(
            JSON.stringify({
                success: true,
                message: "List Data Posts!",
                data: posts,
            })
        );
    } catch (e: unknown) {
        console.error(`Error getting posts: ${e}`);
    }
}

export async function createPost(options: { title: string; content: string }) {
    try {
        const { title, content } = options;

        const post = await prisma.post.create({
            data: {
                title: title,
                content: content,
            },
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: "Post Created Successfully!",
                data: post,
            })
        );
    } catch (e: unknown) {
        console.error(`Error creating post: ${e}`);
    }
}

export async function getPostById(id: string) {
    try {
        const postId = parseInt(id);

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });

        if (!post) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Detail Post Data Not Found!",
                    data: null,
                })
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: `Detail Post Data From By ID: ${id}`,
                data: post,
            })
        );
    } catch (e: unknown) {
        console.error(`Error finding post: ${e}`);
    }
}

export async function updatePost(id: string, options: { title?: string; content?: string }) {
    try {
        const postId = parseInt(id);
        const { title, content } = options;

        const post = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                ...(title ? { title } : {}),
                ...(content ? { content } : {}),
            },
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: `Post Updated From ID: ${id} Successfully!`,
                data: post,
            })
        );
    } catch (e: unknown) {
        console.error(`Error updating post: ${e}`);
    }
}

export async function deletePost(id: string) {
    try {
        const postId = parseInt(id);
        const post = await prisma.post.delete({
            where: {
                id: postId,
            },
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: `Post Deleted From ID: ${id} Successfully!`,
                data: post,
            })
        );
    } catch (e: unknown) {
        console.error(`Error deleting post: ${e}`);
    }
}
