import { Images } from "../Assets";

export default function ReviewCard({ item }) {
  let Arrays = [];
  for (let i = 1; i <= +item.star; i++) {
    Arrays.push(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
        key={i}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
  }
  return (
    <section className="bg-blueGray-100 rounded-t-10xl overflow-hidden">
      <div className="container px-4 mx-auto">
        <div
          className={`mb-2 shadow-lg rounded-t-3xl ${
            item?.review != "" ? "rounded-b-xl" : "rounded-b-3xl"
          }  overflow-hidden`}
        >
          <div className="py-3 px-4 md:px-16 bg-white bg-opacity-40">
            <div className="flex flex-wrap items-center">
              <div className="bg-white p-3 rounded-3xl mr-6 shadow-lg">
                <img className="h-10 w-10" src={Images.user} alt="user" />
              </div>
              <h4 className="w-full md:w-auto text-xl font-heading font-medium">
                {item?.userName ? item?.userName : "smit"}
              </h4>
              <div className="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200"></div>
              <span className="mr-4 text-xl font-heading font-medium">
                {item?.star + ".0"}
              </span>
              <div className="flex justify-center gap-0.5 text-yellow-400">
                {Arrays}
              </div>
              {getRemainingStar(Arrays.length)}
            </div>
          </div>
          {item?.review != "" && item?.review != null && (
            <div className="px-4 overflow-hidden md:px-16 pt-8 pb-12 bg-white">
              <div className="flex flex-wrap">
                <div className="w-full mb-6 md:mb-0">
                  <p className="mb-8 max-w-xs text-darkBlueGray-400 leading-loose">
                    {item?.review}
                  </p>
                </div>
                {/* <div className="w-full md:w-1/3 text-right">
                <p className="mb-8 text-sm text-gray-300">Added 2 months ago</p>
            </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export const getRemainingStar = (number) => {
  let data = [];
  for (let i = 1; i <= 5 - number; i++) {
    data.push(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
  }
  return (
    <div className="flex justify-center gap-0.5 text-slate-200">{data}</div>
  );
};
