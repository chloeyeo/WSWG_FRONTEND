import React from "react";
import SectionWarp from "../../components/Layout/Section";
import { Link } from "react-router-dom";
function MateList(props) {
    const category = [
        {
            name: "연인",
            image: "/images/mate_lover.png",
            link: "/lover",
        },
        {
            name: "친구",
            image: "/images/mate_friend.png",
            link: "/friend",
        },
        {
            name: "가족",
            image: "/images/mate_family.png",
            link: "/family",
        },
        {
            name: "단체",
            image: "/images/mate_group.png",
            link: "/group",
        },
        {
            name: "반려",
            image: "/images/mate_pet.png",
            link: "/pet",
        },
        {
            name: "혼밥",
            image: "/images/mate_self.png",
            link: "/self",
        },
    ];
    return (
        <>
            <SectionWarp>
                <div>누구랑갈까</div>
                <div className="flex-wrap grid grid-cols-3">
                    {category.map((item, index) => {
                        return (
                            <div className="px-5" key={index}>
                                <Link to={item.link}>
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="block"
                                    />
                                    {item.name}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </SectionWarp>
        </>
    );
}

export default MateList;
