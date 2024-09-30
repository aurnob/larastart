import { Button } from '@/components/ui/button'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function Example() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Shadcn/ui Button Example</h1>
            <Button variant="default">Default Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>

            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Is it touchable?</AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto reprehenderit cumque facere vero architecto tempore commodi temporibus minima laudantium sunt.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}