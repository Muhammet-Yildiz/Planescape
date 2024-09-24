import { Box, Button, FormHelperText, Stack, Typography, Grid } from "@mui/material"
import toast from "react-hot-toast";
import { IoAirplane } from "react-icons/io5";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputSearchField } from "../../components/input-search-field";
import { BiSolidPlaneLand } from "react-icons/bi";
import { BiSolidPlaneTakeOff } from "react-icons/bi";
import { DateField } from "../../components/date-field";
import { useGetDestinations, useGetFlights } from "../../services/queries";
import dayjs from "dayjs";
import { FaPlus } from "react-icons/fa6";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { FlightsController } from "../../types/flight";
import { Destination } from "../../types/destination";

dayjs.extend(isSameOrAfter);

type FlightsSearchProps = {
    controller: FlightsController;
    setController: React.Dispatch<React.SetStateAction<FlightsController>>
};

export const FlightsSearch: React.FC<FlightsSearchProps> = ({ controller, setController }) => {
    const { destinations = [] } = useGetDestinations();

    const { refetch } = useGetFlights(controller.from, controller.to, controller.sortBy, controller.filterMode, controller.departureDate);

    const validationSchema = Yup.object().shape({
        from: controller.filterMode ? Yup.string().required('From is required') : Yup.string(),
        to: controller.filterMode ? Yup.string().required('To is required') : Yup.string(),
        departureDate: Yup.date()
            .required('Departure date is required')
            .min(dayjs().startOf('day'), 'Departure date cannot be in the past'),
        returnDate: controller.journeyType === 'Round trip' ?
            Yup.date()
                .nullable()
                .test('is-after-or-same-as-departure', 'Return date cannot be before departure date', function (value) {
                    const { departureDate } = this.parent;
                    return value ? dayjs(value).isSameOrAfter(dayjs(departureDate), 'day') : false;
                })
                .min(dayjs().startOf('day'), 'Return date cannot be in the past')
            : Yup.date().nullable(),
    });


    const formik = useFormik({
        initialValues: {
            from: '',
            to: '',
            departureDate: dayjs().add(0, 'day'),
            returnDate: dayjs().add(1, 'day'),
            submit: null
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const { from, to, departureDate } = values

                await setController({ ...controller, from, to, departureDate: departureDate.format('YYYY-MM-DD') });

                const { isSuccess, data, isPending, isLoading } = await refetch();
                if (!isLoading && !isPending && isSuccess && Object.keys(data).length !== 0) {
                    toast.success('Flights listed successfully');
                } else {
                    toast.error('No flights found');
                }

                helpers.setStatus({ success: true });
                helpers.setSubmitting(false);
            } catch (err: any) {
                console.error(err);
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },

    });

    const handleJourneyTypeChange = (journeyType: string) => {
        setController({ ...controller, journeyType });
    };

    const destinationOptions = destinations?.map((destination: Destination) => ({
        label: `${destination.city || destination?.publicName?.english} - ${destination.country}`,
        iata: destination.iata,
    }));

    return (
        <Stack
            sx={{
                width: '100%',
                bgcolor: 'white',
                borderRadius: '10px',
                px: 2,
                py: 3,
                boxSizing: 'border-box',

            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.4 }}>
                <IoAirplane
                    size={20}
                />
                <Typography
                    variant="body2"
                    fontWeight={600}
                    color="text.secondary"
                >  BOOK YOUR FLIGHT
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box
                    sx={{
                        '& button': {
                            borderRadius: '0',
                            textShadow: 'none',
                            boxShadow: 'none',
                            '&:hover': {
                                boxShadow: 'none',
                            },
                            letterSpacing: 0,
                            px: 2.6,
                            py: 1,
                            fontWeight: 600,
                            fontSize: 11

                        }
                    }}
                >
                    {['Round trip', 'One way'].map((item, index) => {
                        return (
                            <Button
                                key={index}
                                variant="contained"
                                size="small"
                                sx={{
                                    backgroundColor: controller.journeyType === item ? 'primary.main' : '#E7DFEF',
                                    color: controller.journeyType === item ? 'white' : 'text.main',
                                    borderTopLeftRadius: index === 0 ? '10px !important' : 0,
                                    borderBottomLeftRadius: index === 0 ? '10px !important' : 0,
                                    borderTopRightRadius: index === 1 ? '10px !important' : 0,
                                    borderBottomRightRadius: index === 1 ? '10px !important' : 0,
                                    '&:hover': {
                                        backgroundColor: controller.journeyType === item ? 'primary.main' : '#E7DFEF',

                                    }

                                }}
                                onClick={() => handleJourneyTypeChange(item)}
                            >
                                {item}
                            </Button>
                        )
                    })}
                </Box>

            </Box>

            <Grid
                container
                sx={{
                    width: '100%',
                    mt: 3.4,
                    '& .MuiGrid-item:not(:last-child)': {
                        pr: 1
                    }
                }}
            >
                <Grid
                    item
                    xs={3}
                >
                    <InputSearchField
                        error={Boolean(formik.touched.from && formik.errors.from)}
                        fullWidth
                        helperText={formik.touched.from && formik.errors.from}
                        name="from"
                        onBlur={formik.handleBlur}
                        onInputChange={(e: any) => formik.setFieldValue('from', e.target.id)}
                        value={formik.values.from}
                        placeholder="From"
                        disabled={!controller.filterMode}
                        startIcon={<BiSolidPlaneTakeOff />}
                        options={destinationOptions}
                    />
                </Grid>
                <Grid
                    item
                    xs={3}
                >
                    <InputSearchField
                        error={Boolean(formik.touched.to && formik.errors.to)}
                        fullWidth
                        helperText={formik.touched.to && formik.errors.to}
                        name="to"
                        onBlur={formik.handleBlur}
                        onInputChange={(e: any) => {
                            formik.setFieldValue('to', e.target.id);
                        }}
                        value={formik.values.to}
                        disabled={!controller.filterMode}
                        placeholder="To"
                        startIcon={<BiSolidPlaneLand />}
                        options={destinationOptions}
                    />
                </Grid>
                <Grid
                    item
                    xs={3}
                >
                    <DateField
                        fullWidth
                        onChange={(date) => {
                            formik.setFieldValue('departureDate', date);
                        }}
                        value={formik.values.departureDate}
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.touched.departureDate && formik.errors.departureDate)}
                        helperText={
                            formik.touched.departureDate && typeof formik.errors.departureDate === 'string' ? formik.errors.departureDate : undefined
                        }
                        name="departureDate"
                    />
                </Grid>
                <Grid
                    item
                    xs={3}
                >
                    {
                        controller.journeyType === 'Round trip' ?
                            <DateField
                                fullWidth
                                onChange={(date) => {
                                    formik.setFieldValue('returnDate', date);
                                }}
                                onBlur={formik.handleBlur}
                                value={formik.values.returnDate}
                                error={Boolean(formik.touched.returnDate && formik.errors.returnDate)}
                                helperText={
                                    formik.touched.returnDate && typeof formik.errors.returnDate === 'string'
                                        ? formik.errors.returnDate
                                        : undefined
                                }
                                name="returnDate"
                            />
                            :
                            <Box
                                display={'flex'}
                                alignItems={'center'}
                                gap={1.8}
                                sx={{
                                    backgroundColor: 'background.default',
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                    borderColor: '#d5d8e1',
                                    borderRadius: 1,
                                    boxShadow: '0px 1px 2px 0px rgba(9, 30, 66, 0.08)',
                                    px: 1.5,
                                    py:  { xs: 1.25, sm: 0.95 },
                                    cursor: 'pointer',
                                }}
                                onClick={() => setController({ ...controller, journeyType: 'Round trip' })}
                            >
                                <FaPlus size={17} color="#6B7280" />
                                <Typography variant="body2" fontSize={{ xs: 11, sm: 14 }} >
                                      Add Return
                                </Typography>
                            </Box>
                    }

                </Grid>
                {formik.errors.submit && (
                    <Grid
                        item
                        xs={12}
                    >
                        <FormHelperText error>
                            {formik.errors.submit}
                        </FormHelperText>
                    </Grid>
                )}
            </Grid>
            <Button
                type="submit"
                variant="contained"
                sx={{
                    mt: 3.4,
                    width: '8rem'
                }}
                disabled={formik.isSubmitting}
                onClick={() => {
                    formik.handleSubmit();
                }}
            >
                Show flights
            </Button>
        </Stack>
    )
}