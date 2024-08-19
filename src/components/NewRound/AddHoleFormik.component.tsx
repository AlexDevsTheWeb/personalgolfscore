import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetNewRoundHoleTmp } from '../../features/hole/holeTmp.slice';
import { setHolesCompleted, setNewHole } from '../../features/newRound/newRoundHoles.slice';
import { RootState } from '../../store/store';
import BoxSingleHoleContainer from '../../styles/box/BosSingleHoleContainer.styles';
import BoxNewHole from '../../styles/box/BoxNewHole.styles';
import BoxSingleHoleInternal from '../../styles/box/BoxSingleHoleInternal.styles';
import { fairwayValues, greenSideValues, hcpList18, hcpList9, parList } from '../../utils/constant.utils';
import Select from './components/Select.component';

const AddHoleFormik = () => {
  const dispatch = useDispatch();

  const { round: { roundPlayingHCP, roundHoles }
  } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { holesCompleted } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const { teeClubs, greenClubs, chipClubs } = useSelector((store: RootState) => store.golfBag);

  const [tmpHole, setTmpHole] = useState<any>();

  const formik = useFormik({
    initialValues: {
      driveDistance: '',
      fairway: '',
      hcp: '',
      par: '',
      putts: '',
      strokes: '',
      teeClub: '',
      toGreen: '',
      greenSide: '',
      chipClub: ''
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      setTmpHole(values);
      saveHole();
      // Kalert(JSON.stringify(values, null, 2));
    },
  });

  const saveHole = () => {
    const newHoleNumber = holesCompleted + 1
    dispatch(setHolesCompleted({ newHoleNumber }));
  };
  useEffect(() => {
    if (holesCompleted !== 0) {
      setTmpHole({ ...tmpHole, holesCompleted: holesCompleted });
      dispatch(setNewHole({ tmpHole, roundPlayingHCP, roundHoles, holesCompleted }));
      dispatch(resetNewRoundHoleTmp())
    }

    // eslint-disable-next-line
  }, [holesCompleted, dispatch])


  return (
    <form onSubmit={formik.handleSubmit}>
      <BoxSingleHoleContainer>
        <BoxSingleHoleInternal width={70}>
          <BoxNewHole>
            <Select
              name='hcp'
              list={Number(roundHoles) === 18 ? hcpList18 : hcpList9}
              onChange={formik.handleChange}
              value={formik.values.hcp}
            />
            <Select
              name='par'
              list={parList}
              onChange={formik.handleChange}
              value={formik.values.hcp}
            />
            <TextField
              id="strokes"
              name="strokes"
              label="How many strokes?"
              variant="filled"
              type='number'
              value={formik.values.strokes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.strokes && Boolean(formik.errors.strokes)}
              helperText={formik.touched.strokes && formik.errors.strokes}
            />
            <TextField
              id="putts"
              name="putts"
              label="How many putts?"
              variant="filled"
              type='number'
              value={formik.values.putts}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.putts && Boolean(formik.errors.putts)}
              helperText={formik.touched.putts && formik.errors.putts}
            />
          </BoxNewHole>
          <BoxNewHole>
            <Select
              name='fairway'
              list={fairwayValues}
              onChange={formik.handleChange}
              value={formik.values.fairway}
            />
            <Select
              name='teeClub'
              list={teeClubs}
              onChange={formik.handleChange}
              value={formik.values.teeClub}
            />
            <TextField
              id="driveDistance"
              name="driveDistance"
              label="Distance for tee shot"
              variant="filled"
              type='number'
              value={formik.values.driveDistance}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.driveDistance && Boolean(formik.errors.driveDistance)}
              helperText={formik.touched.driveDistance && formik.errors.driveDistance}
            />
          </BoxNewHole>
          <BoxNewHole>
            <Select
              name='toGreen'
              list={greenClubs}
              onChange={formik.handleChange}
              value={formik.values.toGreen}
            />
            <Select
              name='greenSide'
              list={greenSideValues}
              onChange={formik.handleChange}
              value={formik.values.greenSide}
            />
            <Select
              name='chipClub'
              list={chipClubs}
              onChange={formik.handleChange}
              value={formik.values.chipClub}
            />
          </BoxNewHole>
        </BoxSingleHoleInternal>
        <BoxSingleHoleInternal width={30} paddingTop={1.25}>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </BoxSingleHoleInternal>
      </BoxSingleHoleContainer>

    </form>


    //   <Formik
    //   initialValues={{ email: '', password: '' }}
    //   // validate={values => {
    //   //   const errors = {};
    //   //   if (!values.email) {
    //   //     errors.email = 'Required';
    //   //   } else if (
    //   //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    //   //   ) {
    //   //     errors.email = 'Invalid email address';
    //   //   }
    //   //   return errors;
    //   // }}
    //   onSubmit={(values, { setSubmitting }) => {
    //     console.log(values)
    //     setTimeout(() => {
    //       alert(JSON.stringify(values, null, 2));
    //       setSubmitting(false);
    //     }, 400);
    //   }}
    // >
    //   {({ isSubmitting }) => (
    //     <Form>
    //       <Field as="select" name="hcp">
    //         {Number(roundHoles) === 18
    //           ?
    //           hcpList18.map((list: any) => {
    //             return (
    //               <option value={list} key={_.uniqueId('hcp18')}>{list}</option>
    //             )
    //           })
    //           :
    //           hcpList9.map((list: any) => {
    //             return (
    //               <option value={list} key={_.uniqueId('hcp9')}>{list}</option>
    //             )
    //           })
    //         }
    //       </Field>
    //       <Field as='select'
    //         name='par'>
    //         {parList.map((list: any) => {
    //           return (
    //             <option value={list} key={_.uniqueId('par')}>{list}</option>
    //           )
    //         })}
    //       </Field>
    //       <Field as='input' name='strokes' />
    //       <Field as='input' name='putts' />
    //       <Field name="firstName">
    //         {({ }) => (
    //           <TextField name='putts' label='putts' />
    //         )}
    //       </Field>
    //       {/* <Field type="email" name="email" />
    //       <ErrorMessage name="email" component="div" />
    //       <Field type="password" name="password" />
    //       <ErrorMessage name="password" component="div" /> */}
    //       <button type="submit" disabled={isSubmitting}>
    //         Submit
    //       </button>
    //     </Form>
    //   )}
    // </Formik>
  )
}

export default AddHoleFormik
