import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import productPlaceholder from "../assets/images/product-placeholder.png";
import { Storage } from "aws-amplify";
import { Heading } from "@aws-amplify/ui-react";
import Link from "next/link";

interface ProductViewProps {
  id: string;
  picture?: string | undefined;
  label: string;
}

export default function ProductViews({ id, picture, label }: ProductViewProps) {
  const [pictureUrl, setPictureUrl] = useState(String(productPlaceholder));

  useEffect(() => {
    if (picture) {
      /* Storage.get(String(picture))
        .then((url) => {
          console.log(url);

          setPictureUrl(url as string);
        })
        .catch((err) => console.error(err)); */
    }
  }, [picture]);
  return (
    <Link href={`/produits/${id}`}>
      <Box
        w="300px"
        h="300px"
        boxShadow={"0 0 10px rgba(0,0,0,0.2)"}
        margin={"20px 0"}
      >
        <Heading position="relative" bottom="0" as="h2">
          {label}
        </Heading>
      </Box>
    </Link>
  );
}
