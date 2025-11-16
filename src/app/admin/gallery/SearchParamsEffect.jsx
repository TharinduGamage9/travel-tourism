"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchParamsEffect({ setShowForm }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("action") === "add") {
      setShowForm(true);
    }
  }, [searchParams, setShowForm]);

  return null;
}