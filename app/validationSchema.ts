import { string, z } from "zod"

export const loginSchema = z.object({
  emailOrPhone: z.union([
    z.string().max(255).email("فرمت ایمیل / شماره تلفن اشتباه است").nullable(),
    z
      .string()
      .length(11)
      .regex(/^0[0-9]+$/, "باید فقط شامل اعداد باشد"),
  ]),
  password: z
    .string()
    .min(8, "حداقل 8 رقم")
    .regex(/[A-Z]/, "حداقل یک حرف بزرگ")
    .regex(/[a-z]/, "حداقل یک حرف کوچک")
    .regex(/[!@#$%^&*]/, "یک یا چند نماد (%$#@!)"),
})

export const registerSchema = z
  .object({
    emailOrPhone: z.union([
      z.string().max(255).email("فرمت ایمیل / شماره تلفن اشتباه است"),
      z
        .string()
        .length(11)
        .regex(/^0[0-9]+$/, "باید فقط شامل اعداد باشد"),
    ]),
    password: z
      .string()
      .min(8, "حداقل 8 کاراکتر")
      .regex(/[A-Z]/, "حداقل یک حرف بزرگ")
      .regex(/[a-z]/, "حداقل یک حرف کوچک")
      .regex(/[!@#$%^&*]/, "یک یا چند نماد (%$#@!)"),
    confirmPassword: z
      .string()
      .min(8, "")
      .regex(/[A-Z]/, "")
      .regex(/[a-z]/, "")
      .regex(/[!@#$%^&*]/, ""),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "رمزهای وارد شده با هم منطبق نیستند!",
        path: ["confirmPassword"],
      })
    }
  })

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "حداقل 8 کاراکتر")
      .regex(/[A-Z]/, "حداقل یک حرف بزرگ")
      .regex(/[a-z]/, "حداقل یک حرف کوچک")
      .regex(/[!@#$%^&*]/, "یک یا چند نماد (%$#@!)"),
    confirmPassword: z
      .string()
      .min(8, "")
      .regex(/[A-Z]/, "")
      .regex(/[a-z]/, "")
      .regex(/[!@#$%^&*]/, ""),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "رمزهای وارد شده با هم منطبق نیستند!",
        path: ["confirmPassword"],
      })
    }
  })

export const otpVerifySchema = z.object({
  otpCode: z
    .string()
    .length(4, "کد را کامل وارد کنید")
    .regex(/^[0-9]+$/, "باید فقط شامل اعداد باشد"),
})

export const forgetPasswordSchema = z.object({
  emailOrPhone: z.union([
    z.string().min(1, "").max(255).email("فرمت ایمیل / شماره تلفن اشتباه است"),
    z
      .string()
      .length(11)
      .regex(/^0[0-9]+$/, "باید فقط شامل اعداد باشد"),
  ]),
})

const fileSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
})

export const completeProfileSchema = (userType: string) => {
  let schema: any = z.object({
    firstName: z.string().min(1, "حداقل یک کاراکتر"),
    lastName: z.string().min(1, "حداقل یک کاراکتر"),
    nationalCode: z
      .string()
      .regex(/^[0-9]{10}$/, "باید شامل 10 رقم باشد")
      .optional(),
  })

  if (userType === "national") {
    schema = schema.extend({
      nationalCode: z.string().regex(/^[0-9]{10}$/, "باید شامل 10 رقم باشد"),
    })
  } else if (userType === "foreign") {
    schema = schema
      .extend({
        foreignCode: z.string().min(1, "حداقل یک کاراکتر"),
        file: fileSchema,
      })
      .omit({
        nationalCode: true,
      })
  } else if (userType === "legal") {
    schema = schema.extend({
      nationalCode: z.string().regex(/^[0-9]{10}$/, "باید شامل 10 رقم باشد"),
      companyName: z.string().min(1, "حداقل یک کاراکتر"),
      legalCode: z.string().regex(/^[0-9]+$/, "باید فقط شامل اعداد باشد"),
      postalCode: z.string().regex(/^[0-9]+$/, "باید فقط شامل اعداد باشد"),
      address: z.string().min(1, "حداقل یک کاراکتر"),
    })
  }

  return schema
}

// create new ticket schema
export const ticketSchema = z.object({
  title: z.string().min(1, "حداقل یک کاراکتر"),
  // type: z.string({ required_error: "یک گزینه را انتخاب کنید" }),
  // cloud_server: z.string({ required_error: "یک گزینه را انتخاب کنید" }),
  message: z
    .string()
    .min(1, "متن تیکت نباید خالی باشد")
    .max(1024, "حداکثر 1024 کاراکتر"),
})

// send extra messages to the ticket schema
export const ticketMessageSchema = z.object({
  message: z
    .string()
    .min(1, "متن تیکت نباید خالی باشد")
    .max(1024, "حداکثر 1024 کاراکتر"),
})

export const walletSchema = z.object({
  amount: z.string().regex(/^[0-9]+$/, "باید فقط شامل اعداد باشد"),
  voucher: z.string().optional(),
})
