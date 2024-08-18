import { blog_data } from "@/Assets/assets";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
	const [menu, setMenu] = useState("All");
	const [blogs, setBlogs] = useState([]);

	const fetchBlogs = async () => {
		const response = await axios.get("/api/blog");
		setBlogs(response.data.blogs);
		console.log(response.data.blogs);
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

	return (
		<div>
			<div className="flex justify-center gap-6 my-10">
				<button
					onClick={() => setMenu("All")}
					className={
						menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
					}>
					All
				</button>
				<button
					onClick={() => setMenu("Sosial Pendidikan")}
					className={
						menu === "Sosial Pendidikan"
							? "bg-black text-white py-1 px-4 rounded-sm"
							: ""
					}>
					Sosial Pendidikan
				</button>
				<button
					onClick={() => setMenu("Kominfo")}
					className={
						menu === "Kominfo" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
					}>
					Kominfo
				</button>
				<button
					onClick={() => setMenu("Minat Bakat")}
					className={
						menu === "Minat Bakat"
							? "bg-black text-white py-1 px-4 rounded-sm"
							: ""
					}>
					Minat Bakat
				</button>
				<button
					onClick={() => setMenu("Agama")}
					className={
						menu === "Agama" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
					}>
					Agama
				</button>
				<button
					onClick={() => setMenu("Dalam Negeri")}
					className={
						menu === "Dalam Negeri"
							? "bg-black text-white py-1 px-4 rounded-sm"
							: ""
					}>
					Dalam Negeri
				</button>
				<button
					onClick={() => setMenu("BPH")}
					className={
						menu === "BPH" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
					}>
					BPH
				</button>
			</div>
			<div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
				{blogs
					.filter(item => (menu === "All" ? true : item.category === menu))
					.map((item, index) => {
						return (
							<BlogItem
								key={index}
								id={item._id}
								image={item.image}
								title={item.title}
								description={item.description}
								category={item.category}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default BlogList;
