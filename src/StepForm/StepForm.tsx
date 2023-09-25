import clsx from "clsx"
import React from "react"
import { Drawer } from "../Drawer/Drawer"
import { Icon } from "../Icon/Icon"

type StepFormProps = {
  icon: string
  title: string
  done: boolean
  onClick?: () => void
  children: React.ReactNode
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const StepForm: React.FC<StepFormProps> = ({
  children,
  icon,
  title,
  done,
  open,
  setOpen,
}) => {
  return (
    <>
      <button onClick={() => setOpen(true)}>
        <div
          className={clsx(
            "flex items-center justify-between rounded-full border border-primary-60 p-4",
            done ? "bg-primary-60" : "bg-primary-70"
          )}
        >
          <div className="flex items-center gap-4">
            <div
              className={clsx(
                "flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-10"
              )}
            >
              <Icon name={icon} />
            </div>
            <p className="text-lg text-primary-0">{title}</p>
          </div>

          <div className="mr-4 flex items-center justify-self-end text-primary-20">
            <Icon name={done ? "check_circle" : "brightness_1"} />
          </div>
        </div>
      </button>

      <Drawer setOpen={setOpen} open={open} title={title}>
        {children}
      </Drawer>
    </>
  )
}
