import { ConnectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server")
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET_KEY } from "@/lib/config/cloudinary";

// Configure Cloudinary 
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET_KEY
});


// DB Connection
const LoadDB = async () => {
  await ConnectDB();
}

LoadDB();


// API Endpoint to get all blogs
export async function GET(request) {

  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  }
  else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs })
  }
}


// API Endpoint For Uploading Blogs
export async function POST(request, response) {

  try {

    const formData = await request.formData();
    const image = formData.get('image');

    const imageByteData = await image.arrayBuffer()
    const mimeType = image.type
    const encoding = "base64"
    const buffer = Buffer.from(imageByteData).toString("base64")

    const fileUri = "data:" + mimeType + ";" + encoding + "," + buffer;

    const imgUpload = await cloudinary.uploader.upload(fileUri, {
      invalidate: true,
      resource_type: "auto",
      filename_override: 'fileName',
      use_filename: false,
    });

    const blogData = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      author: formData.get('author'),
      image: imgUpload.secure_url,
      authorImg: formData.get('authorImg')
    }

    await BlogModel.create(blogData)

    return NextResponse.json({ success: true, msg: "Blog Added" })

  } catch (error) {

    console.log(error);
    return NextResponse.json({ success: true, msg: error.message })

  }
}

// Creating API Endpoint to delete Blog

export async function DELETE(request) {

  const id = await request.nextUrl.searchParams.get('id')
  await BlogModel.findByIdAndDelete(id)
  return NextResponse.json({ msg: "Blog Deleted" })

}