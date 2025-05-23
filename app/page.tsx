import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Ben Adams</h1>
        <p className="text-xl">Software Developer • CS Student</p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">CodeScope</h3>
              <p className="mb-2">Language-agnostic code analyzer using GPT for smart suggestions.</p>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
	      	<a href="/codescope/" target="_blank" rel="noopener noreferrer">
		Try It Out!
	       	</a>
		</Button>
                <Button>GitHub</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="max-w-2xl mx-auto text-center">
          I'm a Northeastern CS student with a apssion for Software Development, AI, and building tools that make other developers more productive. I'm currently looking for a Fall 2025 internship.
        </p>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-2">Contact</h2>
        <p>Email me at <a href="mailto:badams@northeastern.edu" className="underline">adams.be@northeastern.edu</a></p>
      </section>
    </main>
  );
}
