import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  search: z.string().optional(),
});

function SearchPlayer() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSearch = (values: z.infer<typeof FormSchema>) => {
    if (!values.search) {
      return;
    }

    navigate({ to: `/player/${values.search}` });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSearch)} className="relative">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Search player"
                    className="pr-10"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute top-0 right-0"
          >
            <Search />
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SearchPlayer;
