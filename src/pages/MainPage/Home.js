import React, { useEffect, useState } from "react";
import { SectionFullWrap, SectionWrap } from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";
import { Navigation } from "swiper/modules";
import StarRating from "../../components/Form/StarRating";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import Map from "../../components/Map/Map";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";

function Home({ ...props }) {
    const mateType = [
        { no: 1, cateId: "lover", name: "연인" },
        { no: 2, cateId: "friend", name: "친구" },
        { no: 3, cateId: "family", name: "가족" },
        { no: 4, cateId: "group", name: "단체모임" },
        { no: 5, cateId: "pet", name: "반려동물" },
        { no: 6, cateId: "self", name: "혼자" },
    ];
    const foodType = ["한식", "양식", "중식", "일식", "디저트"];
    const [geoData, setGeoData] = useState([]);
    const [geoCenter, setGeoCenter] = useState([
        37.48073710748562, 126.87963572538791,
    ]);
    const foodtype = useSelector((state) => state.filter.foodType);
    const cateId = useSelector((state) => {
        const mateTypeName = state.filter.mateType;
        const selectedMateType = mateType.find(
            (type) => type.name === mateTypeName
        );
        return selectedMateType ? selectedMateType.cateId : "";
    });
    const [geoMouse, setGeoMouse] = useState(6);
    const fetchRestaurant = async (cateId, foodtype) => {
        try {
            const params = { foodtype };
            const res = await axiosInstance.get(`/restaurants/${cateId}`, {
                params,
            });
            setGeoData(res.data.restaurant);
        } catch (e) {
            console.log(e.message);
        }
    };
    useEffect(() => {
        fetchRestaurant(cateId);
    }, [cateId]);

    return (
        <>
            <SectionFullWrap className={"relative z-1"}>
                <div className=" relative">
                    <Map
                        {...props}
                        geoData={geoData}
                        geoCenter={geoCenter}
                        geoMouse={geoMouse}
                        setGeoCenter={setGeoCenter}
                        setGeoMouse={setGeoMouse}
                        fetchRestaurant={fetchRestaurant}
                        setGeoData={setGeoData}
                        cateId={cateId}
                    ></Map>
                </div>
            </SectionFullWrap>
            <div className="w-[1024px] m-auto pt-20">
                {foodType.map((item, i) => {
                    const filteredGeoData = geoData.filter(
                        (restaurant) =>
                            restaurant.category[0].foodType === foodType[i]
                    );
                    return (
                        <div key={`foodType-${i}`} className="mb-[100px]">
                            <Title className={"titleBasic mx-[32px]"}>
                                #{item}
                            </Title>
                            <Swiper
                                slidesPerView={4}
                                spaceBetween={55}
                                navigation={true}
                                modules={[Navigation]}
                                className="mySwiper mainSwiper"
                            >
                                {filteredGeoData.map((item, i) => {
                                    return (
                                        <SwiperSlide
                                            key={`rst-${i}`}
                                            className="rstWrap"
                                        >
                                            <div className="rstImagwrap">
                                                <img
                                                    src={item.image[0]}
                                                    alt="rstImgWrap"
                                                />
                                            </div>
                                            <Link
                                                to={`/mate/${cateId}/restaurants/${item._id}`}
                                                className="rstLayerWrap"
                                            >
                                                <div>{item.name}</div>
                                                <div>
                                                    <StarRating
                                                        rating={item.rating}
                                                    ></StarRating>{" "}
                                                </div>
                                            </Link>
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
