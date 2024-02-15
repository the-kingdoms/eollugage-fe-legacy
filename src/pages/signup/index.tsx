import React, { useState } from "react";
import { useRouter } from "next/router";
import FlexBox from "@modules/layout/FlexBox";
import Image from "next/image";
import TextButton from "@modules/components/button/TextButton";
import TopTitle from "@modules/layout/TopTitle";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  const handleImageClick = image => {
    if (selectedImage === image) {
      setSelectedImage(null);
    } else {
      setSelectedImage(image);
    }
  };

  const isButtonInactive = selectedImage === null;

  return (
    <FlexBox direction="col" className="w-full h-full px-4 justify-between">
      <TopTitle title="" type="back" />
      <FlexBox direction="col" className="w-full h-full px-4 mt-4 space-y-4">
        <div onClick={() => handleImageClick("owner")}>
          <Image
            height={172}
            width={328}
            alt="for 사장님"
            src={
              selectedImage === "owner"
                ? "/image/for 사장님_active.png"
                : "/image/for 사장님_inactive.png"
            }
          />
        </div>
        <div onClick={() => handleImageClick("employee")}>
          <Image
            height={172}
            width={328}
            alt="for 직원"
            src={
              selectedImage === "employee"
                ? "/image/for 직원_active.png"
                : "/image/for 직원_inactive.png"
            }
          />
        </div>
      </FlexBox>

      <TextButton
        size="L"
        text="다음"
        className="mb-4"
        inactive={isButtonInactive}
        onClick={() => router.push("/signup/owner")}
      />
    </FlexBox>
  );
}
