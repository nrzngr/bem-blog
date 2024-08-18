import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const Footer = () => {
	return (
		<div className="flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center">
			<Image src={assets.logo} alt="" width={60} />
			<p className="text-sm text-white">
				All right reserved. Copyright @nrzngr
			</p>
			<div className="flex flex-row gap-2">
				<Link href="https://www.instagram.com/bem_ubsikarawang/">
					<Image src={assets.instagram} alt="" width={50} />
				</Link>
				<Link href="https://www.tiktok.com/@bemubsi_kab.karawang">
					<Image src={assets.tiktok} alt="" width={48} />
				</Link>
			</div>
		</div>
	);
};

export default Footer;
