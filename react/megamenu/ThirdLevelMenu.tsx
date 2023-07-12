import React from "react"

const ThirdLevelMenu = ({ thirdMenuTrue, thirdMenu }: { thirdMenuTrue: boolean, thirdMenu: any }) => {
    return (
        <div>
            {thirdMenuTrue && thirdMenu.length > 0 ?
                thirdMenu.map((item:
                    { subMenuTitle: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }
                ) => (
                    <div>{item.subMenuTitle}</div>
                )) : <></>
            }
        </div>
    )
}


export default ThirdLevelMenu