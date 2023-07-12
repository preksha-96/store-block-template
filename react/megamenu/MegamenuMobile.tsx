import React, { useEffect, useState } from 'react';
import styles from '../styles/headerDesktop.css'
import { FaAngleRight, FaBars } from 'react-icons/fa';
import ThirdLevelMenu from './ThirdLevelMenu';

export type MegamenuItem = {
    [x: string]: any;
    __editorItemTitle: string;
    secondLevel: Array<{
        displayMenu: string;
        secondLevelSubmenu: Array<{ subMenuTitle: string; href: string }>;
    }>;
    exploreButtonText: string;
    exploreButtonLink: string;
    viewAllText: string;
    viewAllLink: string;
    viewAtoZText?: string;
    viewAtoZLink?: string;

};
const MegamenuMobile: StorefrontFunctionComponent = ({ megamenu1 }: { megamenu1: MegamenuItem }) => {
    const [menubar, setMenubar] = useState(false)
    const [firstMenu, setFirstMenu] = useState<MegamenuItem | undefined>();

    const [secondMenu, setSecondMenu] = useState<any>()
    const [secondMenuTrue, setSecondMenuTrue] = useState(false)
    const [index, setIndex] = useState(-1)
    const [secIndex, setSecIndex] = useState(-1)

    const [thirdMenu, setThirdMenu] = useState<any>()
    const [thirdMenuTrue, setThirdMenuTrue] = useState(false)

    useEffect(() => {
        setFirstMenu(megamenu1)
        if (menubar) {
            setFirstMenu(megamenu1)
        }
    }, [megamenu1, menubar])

    const handleMenuClick = () => {
        setMenubar(!menubar)

    }
    const handleFirstMenuClick = (i: number, secondLevel: { displayMenu: string; secondLevelSubmenu: { subMenuTitle: string; href: string; }[]; }[]) => {
        if (index === i) {
            setIndex(-1);
            setSecondMenu(null)
        } else {
            setIndex(i);
            setSecondMenu(secondLevel)
            setSecondMenuTrue(true)

        }
    }
    const goBack = () => {
        setSecondMenuTrue(false)
        setThirdMenuTrue(false)
        setSecondMenu(null)
        setThirdMenu(null)
    }
   
    const handleSecondMenuClick = (i: number, thirdlevel: { subMenuTitle: string; href: string; }[]) => {
        if (secIndex === i) {
            setSecIndex(-1);
            setThirdMenu(null)
        } else {
            if (thirdlevel) {
                setThirdMenu(thirdlevel)
                setThirdMenuTrue(true)
                setSecIndex(i);
            }


        }
    }
    return (
        <div className='pa4'>
            <a href="javascript:void(0);" className={`${styles.icon}`} onClick={() => { handleMenuClick() }}>
                <FaBars />

            </a>
 
            <div className='block'>
                {menubar ?
                    <article className="pa3 ">
                        {secondMenuTrue ?
                             <button className='flex justify-start bg-action-primary h-100 ml3 mt5 pa3 f6 ph3 pv2 mb2 dib white bg-dark-blue' onClick={() => { goBack() }}>
                        Goback
                    </button>: firstMenu &&
                            firstMenu.map((item: MegamenuItem, i: number) => (
                                <ul className="list  center ba b--light-silver br2">
                                    <li className="ph3 pv3 bb b--light-silver hover-c-danger flex justify-between  w-100" onClick={() => handleFirstMenuClick(i, item.secondLevel)}>{item.__editorItemTitle}
                                        <FaAngleRight />
                                    </li>
                                </ul>
                            ))
                        }

                        {!secondMenuTrue  ?   <></>
                            : secondMenu?.length > 0 && (secondMenu?.map((submenu: {
                                displayMenu: string;
                                secondLevelSubmenu: any[];
                            }, i: number) => (
                                <ul className="list pl0 ml0 center ba b--light-silver br2">
                                    <li className="ph3 pv3 bb b--light-silver  w-100" onClick={() => handleSecondMenuClick(i,
                                        submenu.secondLevelSubmenu)}>
                                        <div className='hover-c-danger flex justify-between  w-100'>
                                            {submenu.displayMenu}   <FaAngleRight />
                                        </div>
                                        {i == secIndex && thirdMenuTrue ?
                                            <div className='pa4 hover-c-danger'><ThirdLevelMenu thirdMenu={thirdMenu} thirdMenuTrue={thirdMenuTrue} /></div> : <></>}
                                    </li>
                                </ul>
                            )))}

                    </article> : <>
                    </>}
            </div>
        </div>
    )
}


MegamenuMobile.schema = {
    title: "Megamenu Mobile",
    description: "Megamenu Mobile Component",
    type: "object",
    properties: {
        megamenu1: {
            type: "array",
            title: "Mega menu first",
            items: {
                properties: {
                    __editorItemTitle: {
                        title: "Menu Display Name",
                        type: "string",
                    },
                    secondLevel: {
                        type: "array",
                        items: {
                            properties: {
                                displayMenu: {
                                    type: "string",
                                    title: "Menu Item ",

                                },
                                href: {
                                    type: "string",
                                    default: "#",
                                    title: "Menu Link",
                                },
                                secondLevelSubmenu: {
                                    type: "array",
                                    title: "Submenu",
                                    items: {
                                        properties: {
                                            subMenuTitle: {
                                                type: "string",
                                                title: "sub Menu title ",
                                            },
                                            href: {
                                                type: "string",
                                                default: "#",
                                                title: "Menu Link",
                                            },
                                        }
                                    }
                                }

                            }
                        }
                    }
                },
            },
        },

    }



}
export default MegamenuMobile