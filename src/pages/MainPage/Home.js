import React from "react";
import { SectionFullWrap, SectionWrap } from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";
import { Navigation } from "swiper/modules";
import StarRating from "../../components/Form/StarRating";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Home(props) {
    const foodType = [
        {
            no: 1,
            name: "#한식",
            rst: [
                {
                    rstName: "중국집1",
                    rating: "",
                    rstImage: "imageSample1.png",
                    link: "",
                },
                {
                    rstName: "중국집1",
                    rating: "",
                    rstImage: "imageSample2.png",
                    link: "",
                },
                {
                    rstName: "중국집1",
                    rating: "",
                    rstImage: "imageSample3.png",
                    link: "",
                },
                {
                    rstName: "중국집1",
                    rating: "",
                    rstImage: "imageSample4.png",
                    link: "",
                },
                {
                    rstName: "중국집1",
                    rating: "",
                    rstImage: "imageSample1.png",
                    link: "",
                },
            ],
        },
        {
            no: 2,
            name: "#양식",
            rst: [
                {
                    rstName: "중국집1",
                    rating: "",
                    rstImage: "imageSample1.png",
                    link: "",
                },
            ],
        },
        {
            no: 3,
            name: "#중식",
            rst: [
                {
                    rstName: "중국집1",
                    rating: "",
                    rstImage: "imageSample1.png",
                    link: "",
                },
                {
                    rstName: "중국집1",
                    rating: "",
                    rstImage: "imageSample1.png",
                    link: "",
                },
                {
                    rstName: "중국집1",
                    rating: "",
                    rstImage: "imageSample1.png",
                    link: "",
                },
                {
                    rstName: "중국집1",
                    rating: "",
                    rstImage: "imageSample1.png",
                    link: "",
                },
                {
                    rstName: "중국집1",
                    rating: "",
                    rstImage: "imageSample1.png",
                    link: "",
                },
                {
                    rstName: "중국집1",
                    rating: "",
                    rstImage: "imageSample1.png",
                    link: "",
                },
                {
                    rstName: "중국집1",
                    rating: "",
                    rstImage: "imageSample1.png",
                    link: "",
                },
            ],
        },
        {
            no: 4,
            name: "#일식",
            rst: [
                {
                    rstName: "중국집1",
                    rating: "",
                    rstImage: "imageSample1.png",
                    link: "",
                },
            ],
        },
        {
            no: 5,
            name: "#디저트",
            rst: [
                {
                    rstName: "중국집1",
                    rating: "",
                    rstImage: "imageSample1.png",
                    link: "",
                },
            ],
        },
    ];
    return (
        <>
            <SectionFullWrap>풀화면 지도</SectionFullWrap>
            <div className="w-[1024px] m-auto">
                {foodType.map((item, i) => {
                    return (
                        <div key={`foodType-${i}`} className="mb-[100px]">
                            <Title className={"titleBasic mx-[32px]"}>
                                {item.name}
                            </Title>
                            <Swiper
                                slidesPerView={4}
                                spaceBetween={55}
                                navigation={true}
                                modules={[Navigation]}
                                className="mySwiper mainSwiper"
                            >
                                {item.rst.map((rst, i) => {
                                    return (
                                        <SwiperSlide
                                            key={`rst-${i}`}
                                            className="rstWrap"
                                        >
                                            <div className="rstImagwrap">
                                                <img
                                                    src={`${process.env.PUBLIC_URL}/images/${rst.rstImage}`}
                                                    alt="rstImgWrap"
                                                />
                                            </div>
                                            <div className="rstLayerWrap">
                                                <div>{rst.rstName}</div>
                                                <div>
                                                    <StarRating
                                                        rating={rst.rating}
                                                    ></StarRating>{" "}
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Home;
