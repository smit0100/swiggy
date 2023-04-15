import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiShoppingBag, FiBarChart, FiCodesandbox } from "react-icons/fi";
import { BiRestaurant, BiCategory } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  RiContactsLine,
  RiContactsBookLine,
  RiContactsBook2Line,
} from "react-icons/ri";
import {
  MdOutlineNotificationAdd,
  MdOutlineFastfood,
  MdOutlineSupervisorAccount,
  MdOutlineDeliveryDining,
  MdOutlineCategory,
} from "react-icons/md";

import { BsBox, BsBoxes, BsBoxSeam } from "react-icons/bs";
import { CiBoxes } from "react-icons/ci";
import { FaBoxes } from "react-icons/fa";
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
    amount: "1354",
    percentage: "-4%",
    title: "Customers",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    pcColor: "red-600",
  },
  {
    icon: <BiRestaurant />,
    amount: "96",
    percentage: "+23%",
    title: "Restaurants",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
    pcColor: "green-600",
  },
  {
    icon: <FiBarChart />,
    amount: "42,339",
    percentage: "+38%",
    title: "Sales",
    iconColor: "rgb(228, 106, 118)",
    iconBg: "rgb(255, 244, 229)",

    pcColor: "green-600",
  },
  {
    icon: <MdOutlineDeliveryDining />,
    amount: "354",
    percentage: "-12%",
    title: "Delevery partner",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
    pcColor: "red-600",
  },
  {
    icon: <BiCategory />,
    amount: "354",
    percentage: "-12%",
    title: "Main Category",
    iconColor: "#6C63FF",
    iconBg: "#EDEBFF",
    pcColor: "red-600",
  },
  {
    icon: <MdOutlineCategory />,
    amount: "354",
    percentage: "-12%",
    title: "Sub Category",
    iconColor: "#D13D46",
    iconBg: "#FFEBEE",
    pcColor: "red-600",
  },
  {
    icon: <BsBox />,
    amount: "0",
    percentage: "-12%",
    title: "Total products",
    iconColor: "#4A90E2",
    iconBg: "#EAF2FE",
    pcColor: "red-600",
  },
  {
    icon: <BsBoxSeam />,
    amount: "0",
    percentage: "-12%",
    title: "Acive products",
    iconColor: "#47B881",
    iconBg: "#D1FAE5",
    pcColor: "red-600",
  },
  {
    icon: <FiCodesandbox />,
    amount: "0",
    percentage: "-12%",
    title: "Deactive products",
    iconColor: "#718096",
    iconBg: "#E2E8F0",
    pcColor: "red-600",
  },
  {
    icon: <RiContactsBook2Line />,
    amount: "0",
    percentage: "-12%",
    title: "Contact us",
    iconColor: "#F9A826",
    iconBg: "#FFF3E0",
    pcColor: "red-600",
  },
  {
    icon: <BsBoxes />,
    amount: "0",
    percentage: "-12%",
    title: "Delivered Order",
    iconColor: "#C2185B",
    iconBg: "#FCE4EC",
    pcColor: "red-600",
  },
  {
    icon: <CiBoxes />,
    amount: "0",
    percentage: "-12%",
    title: "Canceled Order",
    iconColor: "#F9D71C",
    iconBg: "#FFFCE0",
    pcColor: "red-600",
  },
  {
    icon: <FaBoxes />,
    amount: "0",
    percentage: "-12%",
    title: "Rejected Order",
    iconColor: "#00796B",
    iconBg: "#E0F2F1",
    pcColor: "red-600",
  },
  {
    icon: <DiDropbox />,
    amount: "0",
    percentage: "-12%",
    title: "In process Order",
    iconColor: "#3F51B5",
    iconBg: "#E8EAF6",
    pcColor: "red-600",
  },
];
