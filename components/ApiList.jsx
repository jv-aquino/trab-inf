"use client";

import ApiAlert from "@/components/ApiAlert";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";


export default function ApiList ({ entityName, entityIdName }) {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.lojaId}`;

  return (
    <div className="flex flex-col gap-3 pt-4 pb-6">
      <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}`} />
      <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
      <ApiAlert title="POST" variant="admin" description={`${baseUrl}/${entityName}`} />
      <ApiAlert title="PATCH" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
      <ApiAlert title="DELETE" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
    </div>
  );
};