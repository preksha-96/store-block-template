import React, { useEffect, useState } from 'react';
import { Icon } from "vtex.store-icons";
import { FaArrowRight } from 'react-icons/fa';
import styles from '../styles/footer.css'
export type FooterItem = {
    active: boolean;
    __editorItemTitle: string;
    href: string;
    promotional: string;
    secondLevel: Array<{ __editorSecondLevelId: number, displayMenu: string; href: string }>;
    exploreButtonText: string;
    exploreButtonLink: string;
    viewAllText: string;
    viewAllLink: string;
    viewAtoZText?: string;
    viewAtoZLink?: string;

};
const FooterMobile: StorefrontFunctionComponent = ({ footerMenu1 }: { footerMenu1: FooterItem }) => {
    const [menu, setMenu] = useState<any>()
    const [showList, setShowList] = useState(-1);
    useEffect(() => {
        setMenu(footerMenu1)
    }, [footerMenu1])

    const handleClick = (index: number) => {
        console.log('njenjenjnejn', index)
        setShowList(index);

    };
    const handleClose = (index: number) => {
        console.log('nn', index)
        setShowList(-1);

    };
    return (
        <div
        >
            <div className="footer b-action-primary c-muted-1 pl5 pr5">
                <div className='row  col-12 contain pa9-l pa0-s block'
                >
                    {menu && menu.map((user: FooterItem, index: number) => (
                        <div className=" col-md-4 col-lg-4 col-xl-4 col-12">
                            <div className='flex justify-between'>
                                <h1 key={index} className=''>
                                    {user.__editorItemTitle}

                                </h1>
                                {
                                    showList == index ?
                                        <button type="button" className='b--black-0125 bg-transparent' onClick={() => handleClose(index)}>
                                            <Icon id="nav-minus" handle="plusIcon" />
                                        </button> :
                                        <button className='b--black-0125 bg-transparent' onClick={() => handleClick(index)} >
                                            <Icon id="nav-plus" handle="plusIcon" />
                                        </button>
                                }
                            </div>

                            {showList == index &&
                                <ul className='pa0' style={{ listStyle: 'none' }}>
                                    {user.secondLevel?.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <li><a href={item.href}>{item?.displayMenu}</a></li>
                                        </React.Fragment>
                                    ))}
                                </ul>
                            }

                        </div>
                    ))}
                </div>
            </div>
            <div className='row  col-12 contain w-100'
            >
              
                <div className={`${styles.righticon}`}>
                    <label className="db fw6 lh-copy f6" htmlFor="signup"><h2 className='ma1'>Signup to receieve the project antelope newsletter</h2></label>
                    <FaArrowRight className={`${styles.faRighticon}`} />
                    <input placeholder="Search term" />
                </div>
                <div className='mt6 w-100'>
                    <h4 className=' t-heading-4-l ma0'>Connect with us</h4>
                    <div className=' flex'>
                        <div className='ph3'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 320 512">
                                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>
                        </div>
                        <div className='ph3'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 448 512">
                                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
                        </div>
                        <div className='ph3'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 512 512">
                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" /></svg>
                        </div>
                    </div>

                </div>
            </div>
            <div className='flex'>
                <p className='mh2'>Terms of use</p>
                <p className='mh2'> Privacy policy</p>
                <p className='mh2'>All rights reserved </p>
            </div>

        </div >
    )
}


FooterMobile.schema = {
    title: "Footer Mobile",
    description: "Megamenu Component",
    type: "object",
    properties: {
        footerMenu1: {
            type: "array",
            title: "menu first",
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

                                __editorSecondLevelId: {
                                    title: "Menu Display Name",
                                    type: "string",
                                },
                                displayMenu: {
                                    type: "string",
                                    title: "Menu Item ",

                                },
                                href: {
                                    type: "string",
                                    default: "#",
                                    title: "Menu Link",
                                }
                            }
                        }
                    }
                },
            },
        },
        promotional: {
            type: "object",
            title: "Second Level Promo Details",
            properties: {
                promoImage: {
                    type: "string",
                    default: "",
                    title: "Promotional Image",
                    widget: {
                        "ui:widget": "image-uploader",
                    }
                }
            }
        }
    }



}
export default FooterMobile