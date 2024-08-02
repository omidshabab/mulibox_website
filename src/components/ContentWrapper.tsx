const ContentWrapper = ({
     children
}: {
     children: React.ReactNode
}) => {
     return (
          <div className="flex w-full px-[30px] lg:px-[20px] max-w-6xl">
               {children}
          </div>
     );
}

export default ContentWrapper;