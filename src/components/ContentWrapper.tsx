const ContentWrapper = ({
     children
}: {
     children: React.ReactNode
}) => {
     return (
          <div className="flex justify-center w-full h-full">
               <div className="flex w-full px-[30px] lg:px-[20px] max-w-6xl">
                    {children}
               </div>
          </div>
     );
}

export default ContentWrapper;