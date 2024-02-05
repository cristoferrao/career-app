import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'

export const Loader = () => {
  return (
    <div className="d-flex  justify-content-center   " style={{
        marginTop:"5%"
    }} >
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 50,
                    }}
                    spin
                  />
                }
              />
            </div>
  )
}
