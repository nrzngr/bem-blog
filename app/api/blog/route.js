// api/blog/route.js
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");
import { storage } from '@vercel/storage';

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

// API Endpoint to get all blogs
export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

// API Endpoint For Uploading Blogs
export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    const blob = await put(filename, request.body, {
      access: "public",
    });

    const imgUrl = blob.url;

    const formData = await request.formData();
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl, // Use the uploaded image URL
      authorImg: formData.get("authorImg"),
    };

    await BlogModel.create(blogData);

    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error("Error uploading blog:", error);
    return NextResponse.json(
      { success: false, msg: "Error uploading blog" },
      { status: 500 }
    );
  }
}

// Creating API Endpoint to delete Blog

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get('id');

  try {
    const blog = await BlogModel.findById(id);

    if (blog) {
      // Delete the image from Vercel Storage (if applicable)
      if (blog.image.startsWith('https://')) { // Check if it's a Vercel Storage URL
        const imageUrlParts = blog.image.split('/');
        const filename = imageUrlParts[imageUrlParts.length - 1];
        await storage.delete(`public/${filename}`);
      }

      // Delete the blog document from MongoDB
      await BlogModel.findByIdAndDelete(id);

      return NextResponse.json({ msg: "Blog Deleted" });
    } else {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ msg: "Error deleting blog" }, { status: 500 });
  }
}
