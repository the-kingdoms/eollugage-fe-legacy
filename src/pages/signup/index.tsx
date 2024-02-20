import TextButton from "@modules/components/button/TextButton";
import FlexBox from "@modules/layout/FlexBox";
import TopTitle from "@modules/layout/TopTitle";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<null | "owner" | "staff">(
    null,
  );
  const router = useRouter();

  const handleImageClick = (image: "owner" | "staff") => {
    if (selectedImage === image) {
      setSelectedImage(null);
    } else {
      setSelectedImage(image);
    }
  };

  return (
    <FlexBox direction="col" className="w-full h-full px-4 justify-between">
      <TopTitle title="" type="back" />
      <FlexBox direction="col" className="w-full h-full px-4 mt-4 space-y-4">
        <button type="button" onClick={() => handleImageClick("owner")}>
          <Image
            height={172}
            width={328}
            alt="for 사장님"
            src={
              selectedImage === "owner"
                ? "/image/eollugage/signup_owner_active.png"
                : "/image/eollugage/signup_owner_inactive.png"
            }
          />
        </button>
        <button type="button" onClick={() => handleImageClick("staff")}>
          <Image
            height={172}
            width={328}
            alt="for 직원"
            src={
              selectedImage === "staff"
                ? "/image/eollugage/signup_staff_active.png"
                : "/image/eollugage/signup_staff_inactive.png"
            }
          />
        </button>
      </FlexBox>

      <TextButton
        size="L"
        text="다음"
        className="mb-4"
        inactive={selectedImage === null}
        onClick={() => router.push("/signup/owner")}
      />
    </FlexBox>
  );
}
