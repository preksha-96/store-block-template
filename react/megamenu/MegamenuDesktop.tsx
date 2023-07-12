import React, { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import styles from '../styles/headerDesktop.css'
export type MegamenuItem = {
    [x: string]: any;
    __editorItemTitle: string;
    secondLevel: Array<{
        displayMenu: string;
        href: string;
        secondLevelSubmenu: Array<{ subMenuTitle: string; href: string }>;
    }>;
    exploreButtonText: string;
    exploreButtonLink: string;
    viewAllText: string;
    viewAllLink: string;
    viewAtoZText?: string;
    viewAtoZLink?: string;
};

const MegamenuDesktop = ({ megamenu1 }: { megamenu1: MegamenuItem }) => {
    const [menu, setMenu] = useState<MegamenuItem | undefined>();
    const [index, setIndex] = useState(-1);
    const [secondMenu, setSecondMenu] = useState<any>()
    const [thirdlevelMenu, setThirdlevelMenu] = useState<any>()

    useEffect(() => {
        setMenu(megamenu1);
    }, [megamenu1]);

    const handleMenuClick = (i: number, secondLevel: any) => {
        if (index === i) {
            setIndex(-1);
            setSecondMenu(null)
        } else {
            setIndex(i);
            setSecondMenu(secondLevel)
        }
    };

    return (
        <header className="bg-light-blue">
            <div className="bg-danger">
                <section className="pa3 pa4-m pa5-l ">
                    {menu !== undefined &&
                        menu.map((item: MegamenuItem, i: number) => (
                            <a
                                className={` c-on-success relative pa3 f3 link b hover-bg-white hover-c-danger no-underline  dib ph2 pv1`}
                                href={`#${i}`}
                                onClick={() => handleMenuClick(i, item.secondLevel)}
                            >
                                {item.__editorItemTitle}

                            </a>
                        ))}
                </section>
                {secondMenu?.length > 0 && (
                    <div className='w-100 flex absolute bg-base z-1   c--action-danger c-on-muted-1  h-auto mt6 pa4 top-2'>

                        <div className="w-25 ">
                            {secondMenu.map((submenu: { displayMenu: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; secondLevelSubmenu: any[]; }) => (
                                <div className=" c-on-muted-3 f2 flex hover-c-danger justify-between pa2" onMouseOver={() => setThirdlevelMenu(submenu.secondLevelSubmenu)} >
                                    <h4 className='ma0'>    {submenu.displayMenu}</h4>
                                    <FaAngleRight />
                                </div>
                            ))}

                        </div>
                        {thirdlevelMenu?.length > 0 && (
                            <div className={`${styles.datagrid} bg--gray bg-base c--action-primary c-on-muted-1  h-auto  left-1 top-0 w-75 z-1 pl4 pr4`}>
                                {thirdlevelMenu.map((secondSubmenu: { subMenuTitle: boolean | React.ReactPortal | React.ReactChild | React.ReactFragment | null | undefined; }) => (
                                    <div className={`${styles.row} `}>
                                        <div className={`${styles.col} c-on-base  ma0 mb2`}>
                                            <h5 className='ma0'>
                                                {secondSubmenu.subMenuTitle}
                                            </h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div>
                        </div>
                    </div>
                )}

            </div>

        </header>
    );
};



MegamenuDesktop.schema = {
    title: "Megamenu Desktop",
    description: "Megamenu Desktop Component",
    type: "object",
    properties: {
        megamenu1: {
            type: "array",
            title: "Mega Menu",
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

export default MegamenuDesktop;
