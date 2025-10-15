"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

const PURPOSES = [
  'Apply for Membership',
  'Apply for Leadership',
  'Collab in Project',
  'Apply for Blog Writing',
  'Suggestion',
  'General Inquiry',
  'Other',
] as const

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  course: z.string().optional(),
  joiningYear: z.string().optional(),
  subject: z.string().optional(),
  purpose: z.enum(PURPOSES, {
    errorMap: () => ({ message: 'Please select a purpose' })
  }),
  message: z.string().min(5, { message: "Message must be at least 5 characters." }),
})

export default function ContactPage() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      course: "",
      joiningYear: "",
      purpose: PURPOSES[0],
      message: "",
    },
  })

  const {formState: {isSubmitting}} = form

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!res.ok) throw new Error('Network response was not ok')

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      })
      form.reset()
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
      })
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 pt-36 md:pt-48 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">Contact Us</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Have a question, a project idea, or want to join us? Drop us a line!
          </p>
        </div>
        <div className="max-w-2xl mx-auto glass-card p-8 md:p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., B.Tech CSE" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="joiningYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Joining Year</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2023" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Subject removed as requested */}

              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full rounded-md border bg-transparent px-3 py-2 text-foreground/90">
                        {PURPOSES.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your message here..." {...field} rows={6} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting} className="w-full transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}
