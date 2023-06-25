import { allBatches } from "@/.contentlayer/generated";
import { Mdx } from "@/components/markdown/mdx";
import { notFound } from "next/navigation";

type Props = {
  params: {
    batchID: string[];
  };
};

async function getDocFromParams(params: any) {
  const slug = params.batchID?.join("/") || "";

  const batch = allBatches.find((batch) => batch.slugAsParams === slug);

  if (!batch) {
    null;
  }

  return batch;
}

export default async function page({ params }: Props) {
  const batch = await getDocFromParams(params);

  if (!batch) {
    notFound();
  }

  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <Mdx code={batch.body.code} />
        <hr className="my-4 md:my-6" />
        {/* <DocsPager doc={doc} /> */}
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          table of contents
        </div>
      </div>
    </main>
  );
}