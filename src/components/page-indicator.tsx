function PageIndicator({
  pagesCount,
  currentPage,
}: {
  pagesCount: Number;
  currentPage: number;
}) {
  return (
    <ul className="mb-4 flex justify-end gap-2 opacity-0 transition-opacity duration-300 ease-in">
      {Array(pagesCount)
        .fill(0)
        .map((page, index) => (
          <li
            className={`h-[2px] w-3 ${
              currentPage === index ? "bg-gray-100" : "bg-gray-600"
            }`}
            key={index}
          ></li>
        ))}
    </ul>
  );
}

export default PageIndicator;
