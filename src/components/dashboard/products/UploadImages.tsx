"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

type UploadImagesProps = {
  error?: string;
};

const UploadImages = ({ error }: UploadImagesProps) => {
  // Get references to the file input and image elements
  const ref = useRef<HTMLInputElement>(null);
  const [thumbnailSrc, setThumbnailSrc] = useState<string | null>(null);
  const [firstSrc, setFirstSrc] = useState<string | null>(null);
  const [secondSrc, setSecondSrc] = useState<string | null>(null);

  const openFolder = () => {
    ref.current?.click();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (files[0]) setThumbnailSrc(URL.createObjectURL(files[0]));
    if (files[1]) setFirstSrc(URL.createObjectURL(files[1]));
    if (files[2]) setSecondSrc(URL.createObjectURL(files[2]));
  };

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>
          Upload product images below. The first image will be the thumbnail.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="grid gap-2">
            {thumbnailSrc && (
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height={300}
                width={300}
                src={thumbnailSrc}
              />
            )}

            <div className="grid grid-cols-3 gap-2">
              <button type="button">
                {firstSrc && (
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height={84}
                    width={84}
                    src={firstSrc}
                  />
                )}
              </button>
              <button type="button">
                {secondSrc && (
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height={84}
                    width={84}
                    src={secondSrc}
                  />
                )}
              </button>
              <button
                type="button"
                onClick={openFolder}
                className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
              >
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Upload</span>
              </button>
              <input
                ref={ref}
                onChange={onChange}
                type="file"
                name="images"
                className="hidden"
                accept="image/*"
                multiple
              />
            </div>
            <p className="text-sm text-red-500 -mt-2 ml-1">{error}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadImages;
