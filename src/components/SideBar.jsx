"use client";
import {
  CheckSquare,
  HouseLine,
  PresentationChart,
  Stack,
  UserCircle,
  Users,
} from "phosphor-react";
import { GrContact } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";

import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarList,
  Tooltip,
  TooltipAction,
  TooltipContent,
} from "keep-react";

export const SideBar = () => {
  return (
    <>
      <Sidebar className="  hidden dark:bg-darkColor md:block lg:block min-h-screen">
        <SidebarBody>
          <SidebarList className="space-y-0.5">
            <Link to="/admin">
              <SidebarItem className="text-slate-950 dark:text-slate-200">
                <HouseLine size={20} />
                Home
              </SidebarItem>
            </Link>
            <Link to="/admin/tenders">
              <SidebarItem className="text-slate-950 dark:text-slate-200">
                <PresentationChart size={20} />
                Tenders
              </SidebarItem>
            </Link>
            <Link to="/admin/secteurs">
              <SidebarItem className="text-slate-950 dark:text-slate-200">
                <Stack size={20} />
                Secteurs
              </SidebarItem>
            </Link>
            <Link to="/admin/utilisateurs">
              <SidebarItem className="text-slate-950 dark:text-slate-200">
                <Users size={20} />
                Utilisateurs
              </SidebarItem>
            </Link>
            <Link to="/admin/abonnements">
              <SidebarItem className="text-slate-950 dark:text-slate-200">
                <CheckSquare size={20} />
                Abonnements
              </SidebarItem>
            </Link>
            <Link to="/admin/administrateurs">
              <SidebarItem className="text-slate-950 dark:text-slate-200">
                <RiAdminFill size={20} />
                Administrateurs
              </SidebarItem>
            </Link>
            <Link to="/admin/contacts">
              <SidebarItem className="text-slate-950 dark:text-slate-200">
                <GrContact size={20} />
                Contacts
              </SidebarItem>
            </Link>
            <Link to="/admin/profile">
              <SidebarItem className="text-slate-950 dark:text-slate-200">
                <UserCircle size={20} />
                Profile
              </SidebarItem>
            </Link>
          </SidebarList>
        </SidebarBody>
      </Sidebar>

      {/* Side bar Responsive  */}

      <Sidebar className=" dark:bg-darkColor max-w-max block md:hidden lg:hidden min-h-screen">
        <SidebarBody className="space-y-4">
          <SidebarList className="space-y-1">
            <SidebarItem>
              <Tooltip placement="right" contentOffset={30}>
                <TooltipAction asChild>
                  <Link to="/admin">
                    <HouseLine size={20} />
                  </Link>
                </TooltipAction>
                <TooltipContent className="rounded-none text-body-5 font-normal text-white dark:text-metal-900">
                  Home
                </TooltipContent>
              </Tooltip>
            </SidebarItem>
            <SidebarItem>
              <Tooltip placement="right" contentOffset={30}>
                <TooltipAction asChild>
                  <Link to="/admin/tenders">
                    <PresentationChart size={20} />
                  </Link>
                </TooltipAction>
                <TooltipContent className="rounded-none text-body-5 font-normal text-white dark:text-metal-900">
                  Tenders
                </TooltipContent>
              </Tooltip>
            </SidebarItem>
            <SidebarItem>
              <Tooltip placement="right" contentOffset={30}>
                <TooltipAction asChild>
                  <Link to="/admin/secteurs">
                    <Stack size={20} />
                  </Link>
                </TooltipAction>
                <TooltipContent className="rounded-none text-body-5 font-normal text-white dark:text-metal-900">
                  Secteurs
                </TooltipContent>
              </Tooltip>
            </SidebarItem>
            <SidebarItem>
              <Tooltip placement="right" contentOffset={30}>
                <TooltipAction asChild>
                  <Link to="/admin/utilisateurs">
                    <Users size={20} />
                  </Link>
                </TooltipAction>
                <TooltipContent className="rounded-none text-body-5 font-normal text-white dark:text-metal-900">
                  Utilisateurs
                </TooltipContent>
              </Tooltip>
            </SidebarItem>
            <SidebarItem>
              <Tooltip placement="right" contentOffset={30}>
                <TooltipAction asChild>
                  <Link to="/admin/abonnements">
                    <CheckSquare size={20} />
                  </Link>
                </TooltipAction>
                <TooltipContent className="rounded-none text-body-5 font-normal text-white dark:text-metal-900">
                  Abonnements
                </TooltipContent>
              </Tooltip>
            </SidebarItem>
            <SidebarItem>
              <Tooltip placement="right" contentOffset={30}>
                <TooltipAction asChild>
                  <Link to="/admin/administrateurs">
                    <RiAdminFill size={20} />
                  </Link>
                </TooltipAction>
                <TooltipContent className="rounded-none text-body-5 font-normal text-white dark:text-metal-900">
                  Administrateurs
                </TooltipContent>
              </Tooltip>
            </SidebarItem>
            <SidebarItem>
              <Tooltip placement="right" contentOffset={30}>
                <TooltipAction asChild>
                  <Link to="/admin/contacts">
                    <GrContact size={20} />
                  </Link>
                </TooltipAction>
                <TooltipContent className="rounded-none text-body-5 font-normal text-white dark:text-metal-900">
                  Contacts
                </TooltipContent>
              </Tooltip>
            </SidebarItem>
            <SidebarItem>
              <Tooltip placement="right" contentOffset={30}>
                <TooltipAction asChild>
                  <Link to="/admin/profile">
                    <UserCircle size={20} />
                  </Link>
                </TooltipAction>
                <TooltipContent className="rounded-none text-body-5 font-normal text-white dark:text-metal-900">
                  Profile
                </TooltipContent>
              </Tooltip>
            </SidebarItem>
          </SidebarList>
        </SidebarBody>
      </Sidebar>
    </>
  );
};
