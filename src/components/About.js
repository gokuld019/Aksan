import Link from "next/link";

export const metadata = {
  title: "Our Blogs | AKSAN Capital Advisory",
  description:
    "Stay informed with our expert perspectives on capital markets, IPOs, regulatory updates, and strategic finance.",
};

// Replace with your actual backend endpoint.
async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
      // adjust caching to your needs: "no-store" for always-fresh,
      // or { next: { revalidate: 60 } } for ISR
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();

    // Map backend shape -> UI shape. Adjust field names to match your API.
    return data.map((item) => ({
      category: item.category,
      title: item.title,
      excerpt: item.excerpt,
      date: item.date,
      readTime: item.readTime,
      image: item.image,
      imageType: item.imageType || "photo", // "photo" | "cover"
      href: `/blogs/${item.slug}`,
    }));
  } catch (err) {
    console.error("Failed to fetch blogs:", err);
    return [];
  }
}

function BlogCard({
  category,
  title,
  excerpt,
  date,
  readTime,
  image,
  href = "#",
  imageType = "photo",
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Image / cover */}
      <div className="relative h-48 w-full overflow-hidden bg-[#0a1e42]">
        {imageType === "cover" ? (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-4xl font-bold tracking-wide text-white">
              {image}
            </span>
          </div>
        ) : (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-orange-500">
          {category}
        </span>

        <h3 className="mt-2 text-lg font-bold leading-snug text-[#0a1e42] group-hover:text-orange-600 transition-colors">
          {title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
          {excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {date}
            </span>
            <span>&middot;</span>
            <span>{readTime}</span>
          </div>

          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-orange-500 transition-colors group-hover:bg-orange-500 group-hover:text-white">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-[#0a1e42]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/blog-hero-bg.jpg"
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1e42] via-[#0a1e42]/90 to-[#0a1e42]/30" />
      </div>

      {/* Same container/padding as the navbar so the heading lines up with the logo */}
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8">
        <h1 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
          Our Blogs
        </h1>

        <div className="mt-4 h-1 w-16 bg-orange-500" />

        <p className="mt-6 max-w-xl text-base text-gray-300 md:text-lg">
          Stay informed with our expert perspectives on capital markets,
          IPOs, regulatory updates, and strategic finance.
        </p>
      </div>
    </section>
  );
}

function LatestInsights({ blogs = [] }) {
  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0a1e42] md:text-4xl">
            Latest Insights
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Explore our latest articles covering key developments, market
            trends, and expert opinions that matter to your investment
            decisions.
          </p>
        </div>

        {blogs.length === 0 ? (
          <p className="mt-12 text-center text-gray-400">
            No blogs to show yet.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog.href} {...blog} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main>
      <BlogHero />
      <LatestInsights blogs={blogs} />
    </main>
  );
}