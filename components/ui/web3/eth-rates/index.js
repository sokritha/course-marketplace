import { useEthPrice, COURSE_PRICE } from "@components/hooks/useEthPrice";
import { Loader } from "@components/ui/commons";
import Image from "next/image";

export default function EthRates() {
  const { eth } = useEthPrice();

  return (
    <div className="body-content-layout flex flex-col tabletPortrait:flex-row">
      <div className="flex items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md w-full">
          <div className="flex items-center justify-center">
            {!eth.data ? (
              <div className="w-full flex justify-center">
                <Loader />
              </div>
            ) : (
              <>
                <Image
                  layout="fixed"
                  height="35"
                  width="35"
                  src="/small-eth.webp"
                />
                <span className="text-2xl font-bold"> = {eth.data}$</span>
              </>
            )}
          </div>
          <p className="text-xl text-gray-500">Current eth Price</p>
        </div>
      </div>
      <div className="flex flex-1 items-stretch text-center tabletPortrait:ml-4">
        <div className="p-10 border drop-shadow rounded-md w-full tabletPortrait:w-auto">
          <div className="flex items-center justify-center">
            {!eth.data ? (
              <div className="w-full flex justify-center">
                <Loader />
              </div>
            ) : (
              <>
                <span className="text-2xl font-bold">{eth.perItem}</span>
                <Image
                  layout="fixed"
                  height="35"
                  width="35"
                  src="/small-eth.webp"
                />
              </>
            )}

            <span className="text-2xl font-bold">= {COURSE_PRICE}$</span>
          </div>
          <p className="text-xl text-gray-500">Price per course</p>
        </div>
      </div>
    </div>
  );
}
