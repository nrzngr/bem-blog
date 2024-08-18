"use client";

import { assets } from "@/Assets/assets";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";

const page = () => {
  const inputFileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    author: "Kominfo",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const file = inputFileRef.current.files[0];

    try {
      const response = await fetch(`/api/blog/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Upload Result:", result);

        // Assuming result.url contains the uploaded image URL
        const imgUrl = result.url;

        // Create the blog data object
        const blogData = {
          title: data.title,
          description: data.description,
          category: data.category,
          author: data.author,
          authorImg: data.authorImg,
          image: imgUrl,
        };

        // Send the blog data to your main API route
        const blogResponse = await fetch("/api/blog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogData),
        });

        if (blogResponse.ok) {
          toast.success("Blog Added");
          setImage(null);
          setData({
            title: "",
            description: "",
            category: "Startup",
            author: "Kominfo",
            authorImg: "/author_img.png",
          });
        } else {
          toast.error("Error creating blog post");
        }
      } else {
        toast.error("Error uploading image");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error uploading image");
    }
  };

	return (
		<>
			<form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
				<p className="text-xl">Upload thumbnail</p>
				<label htmlFor="image">
					<Image
						className="mt-4"
						src={!image ? assets.upload_area : URL.createObjectURL(image)}
						width={140}
						height={70}
						alt=""
					/>
				</label>
				<input
					onChange={e => setImage(e.target.files[0])}
					type="file"
					id="image"
					hidden
					required
				/>
				<p className="text-xl mt-4">Judul Berita</p>
				<input
					name="title"
					onChange={onChangeHandler}
					value={data.title}
					className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
					type="text"
					placeholder="Ketik sini"
					required
				/>
				<p className="text-xl mt-4">Isi Berita</p>
				<textarea
					name="description"
					onChange={onChangeHandler}
					value={data.description}
					className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
					type="text"
					placeholder="Ketik sini"
					rows={6}
					required
				/>
				<p className="text-xl mt-4">Kategori Berita</p>
				<select
					name="category"
					onChange={onChangeHandler}
					value={data.category}
					className="w-40 mt-4 px-4 py-3 border text-gray-500">
					<option value="Kegiatan">Kegiatan</option>
					<option value="Undangan">Undangan</option>
					<option value="Informasi">Informasi</option>
				</select>
				<br />
				<button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
					ADD
				</button>
			</form>
		</>
	);
};

export default page;
