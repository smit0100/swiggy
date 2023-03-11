import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiShoppingBag, FiBarChart } from "react-icons/fi";
import { BiRestaurant } from "react-icons/bi";
import { IoMdContacts, IoIosAddCircleOutline } from "react-icons/io";
import { RiContactsLine } from "react-icons/ri";
import { MdOutlineSupervisorAccount, MdOutlineFastfood } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";

export const earningData = [
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
    icon: <HiOutlineRefresh />,
    amount: "354",
    percentage: "-12%",
    title: "delevery partner",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
    pcColor: "red-600",
  },
];
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
