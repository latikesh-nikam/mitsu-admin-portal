import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React from 'react';
import styles from "./accordion.module.scss";
import { IAccordionProps } from './accordion.types';
import DOMPurify from 'dompurify';

const Accordion: React.FC<IAccordionProps> = ({ modulesData, screensData, subModulesData, activitiesData }) => {

  return (
    <div className={styles.accordionContainer}>
      {!!modulesData ?
        <>
          <div className={styles.moduleContainer}>
            <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`${modulesData?.name}`) }} className={styles.moduleHeading}></h2>
            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`${modulesData?.description}`) }} className={styles.label}></span>
            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`Week-${modulesData?.week}`) }} className={styles.label}></span>
          </div>

          <CAccordion alwaysOpen activeItemKey={1}>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>Sub Modules</CAccordionHeader>
              <CAccordionBody>

                <CTable color="dark" align="middle" className="mb-0 border" hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell className="text-center" scope="col">Day</CTableHeaderCell>
                      <CTableHeaderCell className="text-center" scope="col">Module Id</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {
                      subModulesData?.map((val: any, index: number) => {
                        return (
                          <CTableRow v-for="item in tableItems" key={index} color="light">
                            <CTableDataCell className="text-center">{val.day}</CTableDataCell>
                            <CTableDataCell className="text-center">{val.moduleId}</CTableDataCell>
                          </CTableRow>
                        )
                      })
                    }
                  </CTableBody>
                </CTable>

              </CAccordionBody>
            </CAccordionItem>

            <CAccordionItem itemKey={2}>
              <CAccordionHeader>Activities</CAccordionHeader>
              <CAccordionBody>

                <CTable color="dark" align="middle" className="mb-0 border" hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell className="text-left" scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell className="text-center" scope="col">Duration</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {activitiesData[0]?.map((val: any, index: number) => {
                      return (
                        <CTableRow v-for="item in tableItems" key={index} color="light">
                          <CTableDataCell className="text-left">{val.name}</CTableDataCell>
                          <CTableDataCell className="text-center">{val.durationMin}</CTableDataCell>
                        </CTableRow>
                      )
                    })
                    }
                  </CTableBody>
                </CTable>

              </CAccordionBody>
            </CAccordionItem>

            <CAccordionItem itemKey={3}>
              <CAccordionHeader>Screens</CAccordionHeader>
              <CAccordionBody>

                <CTable color="dark" align="middle" className="mb-0 border" hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell className="text-center" scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell className="text-center" scope="col">Type</CTableHeaderCell>
                      <CTableHeaderCell className="text-center" scope="col">Content Heading</CTableHeaderCell>
                      <CTableHeaderCell className="text-center" scope="col">Content Text</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {screensData?.map((val: any, index: number) => {
                      return (
                        val.map((values: any) => {
                          return (
                            <CTableRow v-for="item in tableItems" key={index} color="light">
                              <CTableDataCell className="text-center">{values.name}</CTableDataCell>
                              <CTableDataCell className="text-center">{values.type}</CTableDataCell>
                              <CTableDataCell className="text-center">{!!values.content_heading ? values.content_heading : "N/A"}</CTableDataCell>
                              <CTableDataCell className="text-center">
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`${!!values.content_text ? values.content_text : "N/A"}`) }}></div>
                              </CTableDataCell>
                            </CTableRow>
                          )
                        })
                      )
                    })
                    }
                  </CTableBody>
                </CTable>

              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </>
        :
        <>
          <CTableRow>
            <CTableDataCell>No records found</CTableDataCell>
          </CTableRow>
        </>
      }
    </div >
  )
}

export default Accordion