type PreProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>

export const Pre = (props: PreProps) => {
  return (
    <div>
      <pre {...props} />
    </div>
  )
}
