import { useState } from 'react'
  type Props = {
    dataName: any
  }
  
  export const TabModals = ({
    dataName,
  }: Props) => {
    const [visibleTab, setVisibleTab] = useState(dataName[0].id)
  
    const listTitles = dataName.map((item: any) => 
        <li key = {item.id} onClick={() => setVisibleTab(item.id)} className={visibleTab === item.id ? "tab-title tab-title--active" : "tab-title"}>
            {item.tabTitle}</li>
    )       
                                     
    const listContent = dataName.map((item: any) => 
        <p key = {item.id }style={visibleTab === item.id ? {} : {display: 'none'}} className="text-gray-500 dark:text-gray-300">{item.tabContent}</p>
    )

  
    return(
        <div className="tabs">
          <div className="dark:text-gray-300 tabs-titles">
            {listTitles}
          </div>
          <div className="dark:text-gray-300 tab-content">
             {listContent}
          </div>
        </div>
      )
  }