import React, { useEffect, useState } from "react";
import { SectionWrap } from "../../components/Layout/Section";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import Title from "../../components/Layout/Title";
import StarRating from "../../components/Form/StarRating";
import { IconWish } from "../../components/Form/Icon";
import SelectDiv from "../../components/Form/Select";
import { useSelector } from "react-redux";

function RestaurantList() {
    const category = [
        {
            cateId: "lover",
            name: "연인과 가볼까?",
            image: "/images/mate_lover.png",
            link: "/mate/lover",
        },
        {
            cateId: "friend",
            name: "친구와 가볼까?",
            image: "/images/mate_friend.png",
            link: "/mate/friend",
        },
        {
            cateId: "family",
            name: "가족과 가볼까?",
            image: "/images/mate_family.png",
            link: "/mate/family",
        },
        {
            cateId: "group",
            name: "단체모임 가볼까?",
            image: "/images/mate_group.png",
            link: "/mate/group",
        },
        {
            cateId: "pet",
            name: "반려동물과 가볼까?",
            image: "/images/mate_pet.png",
            link: "/mate/pet",
        },
        {
            cateId: "self",
            name: "혼밥 해볼까?",
            image: "/images/mate_self.png",
            link: "/mate/self",
        },
    ];
    const { cateId } = useParams();
    const selectedCategory = category.find((item) => item.cateId === cateId);
    const [restaurantData, setRestaurantData] = useState([]);
    const [loading, setLoading] = useState(false);
    const limit = 8;
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [filters, setFilters] = useState({
        metropolitan: "",
        city: "",
    });
    const userId = useSelector((state) => {
        return state.user.userData.id;
    });
    const [liked, setLiked] = useState({});
    const [likeCount, setLikeCount] = useState(0);
    useEffect(() => {
        restaurantInfo({ skip, limit });
    }, []);
    async function restaurantInfo({
        skip,
        limit,
        loadMore = false,
        filters = {},
    }) {
        try {
            const params = { skip, limit, filters };
            const res = await axiosInstance.get(`/restaurants/${cateId}`, {
                params,
            });
            setRestaurantData(() =>
                loadMore
                    ? [...restaurantData, ...res.data.restaurant]
                    : res.data.restaurant
            );
            setHasMore(res.data.hasMore);
            setLoading(false);
            res.data.restaurant.forEach((item) => likes(item._id));
        } catch (e) {
            console.log(e);
        }
    }
    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            if (!loading && hasMore) {
                setLoading(true);
                restaurantInfo({
                    skip: restaurantData.length,
                    limit,
                    loadMore: true,
                });
            }
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);
    const likes = async (rtId) => {
        const params = { userId };
        try {
            const res = await axiosInstance.get(`/likes/${rtId}`, { params });
            if (
                res.data.like &&
                res.data.like.length > 0 &&
                res.data.like[0].hasOwnProperty("liked")
            ) {
                setLiked((prev) => ({
                    ...prev,
                    [rtId]: res.data.like[0].liked,
                }));
            }
            setLikeCount((prev) => ({ ...prev, [rtId]: res.data.likeCount }));
        } catch (error) {
            console.log(error);
        }
    };
    const handleFilter = (newFilterData, cate1, cate2) => {
        const newFilters = { ...filters };
        newFilters[cate1] = newFilterData.metropolitan;
        newFilters[cate2] = newFilterData.city;
        showFilterResult(newFilterData);
        setFilters(newFilters);
    };
    function showFilterResult(filters) {
        const body = {
            limit,
            skip: 0,
            filters: filters,
        };
        restaurantInfo(body);
        setSkip(0);
    }
    return (
        <SectionWrap>
            <Title className={"titleStt"}>{selectedCategory?.name}</Title>
            <div className="flex gap-2 mb-5">
                <SelectDiv
                    checkedMetropolitan={filters.metropolitan}
                    checkedCity={filters.city}
                    onFilters={(filters) => {
                        handleFilter(filters, "metropolitan", "city");
                    }}
                ></SelectDiv>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
                {restaurantData.map((item, index) => {
                    return (
                        <div
                            key={`restaurantData-${index}`}
                            className="flex gap-7 restaurantListWrap"
                        >
                            <div className="flex-none imgWrap">
                                <Link
                                    to={`/mate/${cateId}/restaurants/${item._id}`}
                                >
                                    <img src={item.image[0]} alt={item.name} />
                                </Link>
                            </div>
                            <div className="flex flex-wrap items-center textWrap py-2">
                                <div className="w-full">
                                    <Link
                                        to={`/mate/${cateId}/restaurants/${item._id}`}
                                    >
                                        <h3>{item.name}</h3>
                                    </Link>
                                    <p>{item.category[0].foodType}</p>
                                    <div className="flex">
                                        <span className="flex-none">
                                            평점:{" "}
                                        </span>
                                        <StarRating
                                            rating={item.rating}
                                        ></StarRating>
                                    </div>
                                </div>
                                <div className="flex gap-2 h-[20px]">
                                    <div className="flex items-center">
                                        <IconWish
                                            className={
                                                liked[item._id] ? "active" : ""
                                            }
                                            liked={liked[item._id]}
                                            disabled={true}
                                        >
                                            좋아요
                                        </IconWish>
                                        {likeCount[item._id] || 0}
                                    </div>
                                    <div className="flex items-center">
                                        <i className="iconBasic iconView">
                                            view
                                        </i>{" "}
                                        {item.views}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </SectionWrap>
    );
}

export default RestaurantList;
