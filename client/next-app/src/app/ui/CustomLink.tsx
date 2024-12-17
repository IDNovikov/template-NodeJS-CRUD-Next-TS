"use client";
import Link from "next/link";

export default function CustomLink({
  text,
  href,
}: {
  text: string;
  href: string;
}): React.ReactNode {
  return (
    <>
      <Link href={href}>
        <a className={"link"}>{text}</a>
      </Link>
      <style jsx>
        {`
          .link {
            text-decoration: none;
            color: white;
            font-size: 20px;
            margin: 10px;
          }
        `}
      </style>
    </>
  );
}
