"use client"

import {
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Download,
  Briefcase,
  Code,
  GraduationCap,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"
import ChatbotButton from "@/components/chatbot-button"
import AnimatedText from "@/components/animated-text"
import { motion } from "framer-motion"
import TimelineItem from "@/components/timeline-item"
import CertificationCard from "@/components/certification-card"
import SidebarNavigation from "@/components/sidebar-navigation"
import ContactForm from "@/components/contact-form"
import portfolioData from "@/data/portfolio-data.json"
import profimeImage from "@/photos/profile.jpeg"

export default function ClientPage() {
  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Sidebar Navigation */}
      <SidebarNavigation />

      <div className="lg:pl-64">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-4 overflow-hidden">
          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                <AnimatedText text={`Hello, I'm ${portfolioData.personal.name}`} />
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                {portfolioData.personal.bio}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="rounded-full px-8 bg-black dark:bg-white dark:text-black text-white hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
                  onClick={() => handleScrollTo("projects")}
                >
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all dark:text-white"
                  onClick={() => handleScrollTo("contact")}
                >
                  Contact Me
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute top-1/4 right-[5%] w-64 h-64 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 dark:from-blue-600 dark:to-purple-600 blur-3xl opacity-20 dark:opacity-10"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="absolute bottom-1/4 left-[10%] w-72 h-72 rounded-full bg-gradient-to-r from-amber-200 to-rose-300 dark:from-amber-600 dark:to-rose-600 blur-3xl opacity-20 dark:opacity-10"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
            onClick={() => handleScrollTo("about")}
          >
            <ChevronDown className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </motion.div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-20 px-4 bg-white dark:bg-gray-900 backdrop-blur-lg bg-opacity-70 dark:bg-opacity-70"
        >
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">About Me</h2>

              {/* Profile Photo and Professional Summary Side by Side */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Profile Photo Column */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="relative w-full max-w-xs mx-auto aspect-square"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-xl"></div>
                    <img
                      src={profimeImage.src}
                      alt={portfolioData.personal.name}
                      className="absolute inset-0 object-cover w-full h-full rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                    />
                    
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-6"
                  >
                    <Button variant="outline" className="rounded-full px-6 py-2 border-gray-300 dark:border-gray-700 dark:text-white" onClick={()=>{window.open('https://drive.google.com/file/d/1DQOxIfbPHDbe4xmz7n1ad6M1KurRCq71/view?usp=sharing','_blank')}}>
                      <Download className="mr-2 h-4 w-4"  />
                      Download Resume
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Professional Summary Column */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col justify-center"
                >
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md h-full">
                    <h3 className="text-xl font-semibold mb-6 dark:text-white">Professional Summary</h3>
                    <div className="space-y-5">
                      <div className="flex items-start gap-3">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-2 mt-1">
                          <Briefcase className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                        </div>
                        <div>
                          <h4 className="font-medium dark:text-gray-400">Experience</h4>
                          <p className="text-gray-600 dark:text-gray-400">4+ years in Software Development</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-2 mt-1">
                          <Code className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                        </div>
                        <div>
                          <h4 className="font-medium dark:text-gray-400">Tech Stack</h4>
                          <p className="text-gray-600 dark:text-gray-400">React, Next.js, Node.js, Nest JS, TypeScript, AI/ML</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-2 mt-1">
                          <GraduationCap className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                        </div>
                        <div>
                          <h4 className="font-medium dark:text-gray-400">Education</h4>
                          <p className="text-gray-600 dark:text-gray-400">Master&#39;s in Computer Science</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-2 mt-1">
                          <MapPin className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                        </div>
                        <div>
                          <h4 className="font-medium dark:text-gray-400">Location</h4>
                          <p className="text-gray-600 dark:text-gray-400">Buffalo, NY</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bio Text */}
              <div className="space-y-6">
                {portfolioData.personal.longBio.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-lg text-gray-700 dark:text-gray-300"
                  >
                    {paragraph}
                  </motion.p>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-4 pt-4"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => window.open(`https://${portfolioData.personal.contact.github}`, "_blank")}
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => window.open(`https://${portfolioData.personal.contact.linkedin}`, "_blank")}
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => window.open(`https://${portfolioData.personal.contact.twitter}`, "_blank")}
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => window.open(`mailto:${portfolioData.personal.contact.email}`)}
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">Featured Projects</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {portfolioData.projects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    tags={project.tags}
                    link={project.link}
                  />
                ))}
              </div>
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  className="rounded-full px-8 dark:text-white"
                  onClick={() => window.open(`https://${portfolioData.personal.contact.github}`, "_blank")}
                >
                  View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="py-20 px-4 bg-white dark:bg-gray-900 backdrop-blur-lg bg-opacity-70 dark:bg-opacity-70"
        >
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">Skills & Expertise</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {portfolioData.skills.map((skillCategory, index) => (
                  <Card
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6 text-center">
                      <h3 className="font-medium text-lg mb-4">{skillCategory.category}</h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {skillCategory.items.map((skill, skillIndex) => (
                          <SkillBadge key={skillIndex} name={skill} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">Professional Experience</h2>
              <div className="max-w-3xl mx-auto">
                {portfolioData.experience.map((exp, index) => (
                  <TimelineItem
                    key={index}
                    title={exp.title}
                    organization={exp.organization}
                    period={exp.period}
                    description={exp.description}
                    isLast={index === portfolioData.experience.length - 1}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Education Section */}
        <section
          id="education"
          className="py-20 px-4 bg-white dark:bg-gray-900 backdrop-blur-lg bg-opacity-70 dark:bg-opacity-70"
        >
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">Education</h2>
              <div className="max-w-3xl mx-auto">
                {portfolioData.education.map((edu, index) => (
                  <TimelineItem
                    key={index}
                    title={edu.title}
                    organization={edu.organization}
                    period={edu.period}
                    description={edu.description}
                    isLast={index === portfolioData.education.length - 1}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">Certifications</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {portfolioData.certifications.map((certification, index) => (
                  <CertificationCard
                    key={index}
                    title={certification.title}
                    year={certification.year}
                    description={certification.description}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        
        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">Get In Touch</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-medium dark:text-gray-400">Let&#39;s work together</h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    I&#39;m currently open to new opportunities. Feel free to reach out.
                  </p>
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <a href={`mailto:${portfolioData.personal.contact.email}`} className="hover:underline dark:text-gray-400">
                        {portfolioData.personal.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Linkedin className="h-5 w-5 text-gray-500" />
                      <a
                        href={`https://${portfolioData.personal.contact.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline dark:text-gray-400"
                      >
                        {portfolioData.personal.contact.linkedin}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Github className="h-5 w-5 text-gray-500" />
                      <a
                        href={`https://${portfolioData.personal.contact.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline dark:text-gray-400"
                      >
                        {portfolioData.personal.contact.github}
                      </a>
                    </div>
                  </div>
                </div>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 dark:text-gray-400">
                © 2025 {portfolioData.personal.name}. All rights reserved.
              </p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full dark:text-gray-400"
                  onClick={() => window.open(`https://${portfolioData.personal.contact.github}`, "_blank")}
                >
                  <Github className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full dark:text-gray-400"
                  onClick={() => window.open(`https://${portfolioData.personal.contact.linkedin}`, "_blank")}
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full dark:text-gray-400"
                  onClick={() => window.open(`https://${portfolioData.personal.contact.twitter}`, "_blank")}
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full dark:text-gray-400"
                  onClick={() => window.open(`mailto:${portfolioData.personal.contact.email}`)}
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </footer>

        {/* Chatbot Button */}
        <ChatbotButton />
      </div>
    </div>
  )
}
