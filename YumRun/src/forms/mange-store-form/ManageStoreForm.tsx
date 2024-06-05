import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/Auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
import { v4 } from "uuid";
import { Store } from "../../types";

const formSchema = z.object({
  storeName: z.string({
    required_error: "Store name is required",
  }),
  city: z.string({
    required_error: "City is required",
  }),
  country: z.string({
    required_error: "Country is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "Delivery price is required",
    invalid_type_error: "Delivery price must be a number",
  }),
  deliveryTime: z.coerce.number({
    required_error: "Delivery time is required",
    invalid_type_error: "Delivery time must be a number in seconds",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "Please select at least one cuisine",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "required"),
      price: z.coerce.number().min(1, "required"),
    })
  ),
  imageFile: z.instanceof(File, { message: "image is required" }).optional(),
});

type StoreFormData = z.infer<typeof formSchema>;

type Props = {
  store?: Store;
  onSave: (storeFormData: FormData) => void;
  isLoading: boolean;
  setIsFormFilled: boolean;
};

function ManageStoreForm({ onSave, isLoading, store }: Props) {
  const { currentUser } = useContext(AuthContext);
  const form = useForm<StoreFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: null }],
    },
  });

  useEffect(() => {
    if (!store) {
      return;
    }

    const deliveryPriceFormatted = store.deliveryPrice / 100;
    const menuItemsFormatted = store.menuItems.map((item) => ({
      ...item,
      price: (item.price / 100).toFixed(2),
    }));

    const updatedStore = {
      ...store,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedStore);
  }, [form, store]);

  const onSubmit = async (formDataJson: StoreFormData) => {
    // turn formdatajson object into FormData
    //check firebase docs if user already has a store
    const dataF: Store = {
      storeName: "",
      city: "",
      country: "",
      deliveryPrice: null,
      deliveryTime: null,
      imageFile: "",
      user: "",
      cuisines: [],
      menuItems: [],
    };

    const imgRef = ref(storage, `/store_image/${v4()}`);
    await uploadBytes(imgRef, formDataJson.imageFile as Blob);
    const url = await getDownloadURL(imgRef);
    dataF.user = currentUser.uid;
    dataF.storeName = formDataJson.storeName;
    dataF.city = formDataJson.city;
    dataF.country = formDataJson.country;
    dataF.deliveryPrice = formDataJson.deliveryPrice * 100;
    dataF.deliveryTime = formDataJson.deliveryTime;
    dataF.imageFile = url;
    dataF.cuisines = formDataJson.cuisines as string[];
    dataF.menuItems = formDataJson.menuItems;

    onSave(dataF);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
}

export default ManageStoreForm;
