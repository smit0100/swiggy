import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiShoppingBag, FiBarChart, FiCodesandbox } from "react-icons/fi";
import {
  BiRestaurant,
  BiCategory,
  BiCategoryAlt,
  BiShapeCircle,
} from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  RiContactsLine,
  RiContactsBookLine,
  RiContactsBook2Line,
  RiRestaurantLine,
} from "react-icons/ri";
import {
  MdOutlineNotificationAdd,
  MdOutlineFastfood,
  MdOutlineSupervisorAccount,
  MdOutlineShapeLine,
  MdOutlineDeliveryDining,
  MdOutlineCategory,
  MdOutlineTableRestaurant,
} from "react-icons/md";

import { BsBox, BsBoxes, BsBoxSeam } from "react-icons/bs";
import { CiBoxes } from "react-icons/ci";
import { FaBoxes } from "react-icons/fa";
import { TbTruckDelivery, TbCategory2 } from "react-icons/tb";
import { GiDeliveryDrone } from "react-icons/gi";
import { DiDropbox } from "react-icons/di";

export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];
export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "dashboard",
        icon: <FiShoppingBag />,
      },
    ],
  },

  {
    title: "Pages",
    links: [
      {
        name: "orders",
        icon: <AiOutlineShoppingCart />,
      },
      {
        name: "customers",
        icon: <RiContactsLine />,
      },
      {
        name: "delivery parter",
        icon: <RiContactsLine />,
      },
      {
        name: "category",
        icon: <IoIosAddCircleOutline />,
      },
      {
        name: "request",
        icon: <BiRestaurant />,
      },
      {
        name: "restaurants",
        icon: <MdOutlineFastfood />,
      },
      {
        name: "contact us",
        icon: <RiContactsBookLine />,
      },
      {
        name: "notification",
        icon: <MdOutlineNotificationAdd />,
      },
    ],
  },
  // {
  //   title: 'Apps',
  //   links: [
  //     {
  //       name: 'calendar',
  //       icon: <AiOutlineCalendar />,
  //     },
  //     {
  //       name: 'task',
  //       icon: <BsKanban />,
  //     },
  //     {
  //       name: 'editor',
  //       icon: <FiEdit />,
  //     },
  //     {
  //       name: 'color-picker',
  //       icon: <BiColorFill />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Charts',
  //   links: [
  //     {
  //       name: 'line',
  //       icon: <AiOutlineStock />,
  //     },
  //     {
  //       name: 'area',
  //       icon: <AiOutlineAreaChart />,
  //     },

  //     {
  //       name: 'bar',
  //       icon: <AiOutlineBarChart />,
  //     },
  //     {
  //       name: 'pie',
  //       icon: <FiPieChart />,
  //     },
  //     {
  //       name: 'financial',
  //       icon: <RiStockLine />,
  //     },
  //     {
  //       name: 'color-mapping',
  //       icon: <BsBarChart />,
  //     },
  //     {
  //       name: 'pyramid',
  //       icon: <GiLouvrePyramid />,
  //     },
  //     {
  //       name: 'stacked',
  //       icon: <AiOutlineBarChart />,
  //     },
  //   ],
  // },
];


export const earningDatas = [
  {
    icon: <MdOutlineSupervisorAccount />,
    amount: "0",
    percentage: "-4%",
    navigation:"customers",
    title: "Customers",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    pcColor: "red-600",
  },
  {
    icon: <BiRestaurant />,
    amount: "0",
    percentage: "+23%",
    navigation:"request",
    title: "Restaurants",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
    pcColor: "green-600",
  },
  {
    icon: <MdOutlineTableRestaurant />,
    amount: "0",
    percentage: "+23%",
    navigation:"restaurants",
    title: "Active restaurants",
    iconColor: "#E77F67",
    iconBg: "#FFEFEA",
    pcColor: "green-600",
  },
  {
    icon: <RiRestaurantLine />,
    amount: "0",
    percentage: "+23%",
    navigation:"request",
    title: "Inactive restaurants",
    iconColor: "#3B82F6",
    iconBg: "#DBEAFE",
    pcColor: "green-600",
  },
  {
    icon: <FiBarChart />,
    amount: "0",
    percentage: "+38%",
    navigation:"orders",
    title: "Sales",
    iconColor: "rgb(228, 106, 118)",
    iconBg: "rgb(255, 244, 229)",

    pcColor: "green-600",
  },
  {
    icon: <MdOutlineDeliveryDining />,
    amount: "0",
    percentage: "-12%",
    navigation:"deliveryboy",
    title: "Delivery partner",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
    pcColor: "red-600",
  },
  {
    icon: <TbTruckDelivery />,
    amount: "0",
    percentage: "-12%",
    navigation:"deliveryboy",
    title: "Active delivery partner",
    iconColor: "#F472B6",
    iconBg: "#FCE7F3",
    pcColor: "red-600",
  },
  {
    icon: <GiDeliveryDrone />,
    amount: "0",
    percentage: "-12%",
    navigation:"deliveryboy",
    title: "Inactive delivery partner",
    iconColor: "#6B7280",
    iconBg: "#F3F4F6",
    pcColor: "red-600",
  },
  {
    icon: <BiCategory />,
    amount: "0",
    percentage: "-12%",
    navigation:"category",
    title: "Main Category",
    iconColor: "#6C63FF",
    iconBg: "#EDEBFF",
    pcColor: "red-600",
  },
  {
    icon: <BiCategoryAlt />,
    amount: "0",
    percentage: "-12%",
    navigation:"category",
    title: "Active Main Category",
    iconColor: "#F59E0B",
    iconBg: "#FEF3C7",
    pcColor: "red-600",
  },
  {
    icon: <TbCategory2 />,
    amount: "0",
    percentage: "-12%",
    navigation:"category",
    title: "Inactive Main Category",
    iconColor: "#47B881",
    iconBg: "#E1FAF2",
    pcColor: "red-600",
  },
  {
    icon: <MdOutlineCategory />,
    amount: "0",
    percentage: "-12%",
    navigation:"category",
    title: "Sub Category",
    iconColor: "#D13D46",
    iconBg: "#FFEBEE",
    pcColor: "red-600",
  },
  {
    icon: <MdOutlineShapeLine />,
    amount: "0",
    percentage: "-12%",
    navigation:"category",
    title: "Active Sub Category",
    iconColor: "#6B46C1",
    iconBg: "#EDE9FE",
    pcColor: "red-600",
  },
  {
    icon: <BiShapeCircle />,
    amount: "0",
    percentage: "-12%",
    navigation:"category",
    title: "Inactive Sub Category",
    iconColor: "#14B8A6",
    iconBg: "#E6FFFA",
    pcColor: "red-600",
  },
  {
    icon: <BsBox />,
    amount: "0",
    percentage: "-12%",
    navigation:"restaurants",
    title: "Total products",
    iconColor: "#4A90E2",
    iconBg: "#EAF2FE",
    pcColor: "red-600",
  },
  {
    icon: <BsBoxSeam />,
    amount: "0",
    percentage: "-12%",
    navigation:"restaurants",
    title: "Acive products",
    iconColor: "#47B881",
    iconBg: "#D1FAE5",
    pcColor: "red-600",
  },
  {
    icon: <FiCodesandbox />,
    amount: "0",
    percentage: "-12%",
    navigation:"restaurants",
    title: "Deactive products",
    iconColor: "#718096",
    iconBg: "#E2E8F0",
    pcColor: "red-600",
  },
  {
    icon: <RiContactsBook2Line />,
    amount: "0",
    percentage: "-12%",
    navigation:"contactus",
    title: "Contact us",
    iconColor: "#F9A826",
    iconBg: "#FFF3E0",
    pcColor: "red-600",
  },
  {
    icon: <BsBoxes />,
    amount: "0",
    percentage: "-12%",
    navigation:"orders",
    title: "Delivered Order",
    iconColor: "#C2185B",
    iconBg: "#FCE4EC",
    pcColor: "red-600",
  },
  {
    icon: <CiBoxes />,
    amount: "0",
    percentage: "-12%",
    navigation:"orders",
    title: "Canceled Order",
    iconColor: "#F9D71C",
    iconBg: "#FFFCE0",
    pcColor: "red-600",
  },
  {
    icon: <FaBoxes />,
    amount: "0",
    percentage: "-12%",
    navigation:"orders",
    title: "Rejected Order",
    iconColor: "#00796B",
    iconBg: "#E0F2F1",
    pcColor: "red-600",
  },
  {
    icon: <DiDropbox />,
    amount: "0",
    percentage: "-12%",
    navigation:"orders",
    title: "In process Order",
    iconColor: "#3F51B5",
    iconBg: "#E8EAF6",
    pcColor: "red-600",
  },
];
