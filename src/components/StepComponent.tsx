import React, { useState } from 'react'
import { Button, Skeleton, SkeletonLine, StepLine, StepPoint, Steps } from 'keep-react'

export const StepComponent = () => {
  const [active, setActive] = useState(1)
  return (
    <div className="space-y-6">
      <Steps>
        <StepPoint variant="border" completed={active >= 1}>
          <p className="flex size-5 items-center justify-center rounded-full border text-body-5 font-medium">1</p>
          <p className="text-body-4 font-medium">choissiser une offre</p>
        </StepPoint>
        <StepLine completed={active >= 2} />
        <StepPoint variant="border" completed={active >= 2}>
          <p className="flex size-5 items-center justify-center rounded-full border text-body-5 font-medium">2</p>
          <p className="text-body-4 font-medium">effectuer le payment</p>
        </StepPoint>
        <StepLine completed={active >= 3} />
        <StepPoint variant="border" completed={active >= 3}>
          <p className="flex size-5 items-center justify-center rounded-full border text-body-5 font-medium">3</p>
          <p className="text-body-4 font-medium">preuve de payment</p>
        </StepPoint>
      </Steps>
      <Skeleton animation={true} className="w-full space-y-2.5">
        <SkeletonLine className="h-4 w-11/12" />
        <SkeletonLine className="h-4 w-9/12" />
        <SkeletonLine className="h-4 w-10/12" />
        <SkeletonLine className="h-4 w-7/12" />
      </Skeleton>
      <div className="flex items-center justify-between">
        <Button disabled={active === 1} onClick={() => setActive(active - 1)}>
          Previous
        </Button>
        <Button disabled={active === 3} onClick={() => setActive(active + 1)}>
          Next Step
        </Button>
      </div>
    </div>
  )
}
